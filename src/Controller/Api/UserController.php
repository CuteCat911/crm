<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\View\AjaxResponse;

/**
 * @Route("/api/user/")
 */
class UserController extends AbstractController
{

    /**
     * @Route("login", name="login_user_api")
     */
    public function loginUserApi(Request $request, AjaxResponse $response, UserPasswordEncoderInterface $encoder, AuthenticationManagerInterface $am, TokenStorageInterface $token_storage)
    {

        $em = $this->getDoctrine()->getManager();
        $login = $request->request->get('login');
        $password = $request->request->get('password');

        if (!$login || !$password) {

            $errors = [];

            if (!$login) $errors['login'] = 'empty';
            if (!$password) $errors['password'] = 'empty';

            return $response->setErrors($errors)->json();

        }

        $user = $em->getRepository(User::class)->findOneBy(['login' => $login]);

        if (!$user) {
            return $response->setErrors([
                'login' => 'wrong',
                'password' => 'wrong'
            ])->json();
        };

        if (!$encoder->isPasswordValid($user, $password)) {
            return $response->setErrors([
                'login' => 'wrong',
                'password' => 'wrong'
            ])->json();
        }

        if ($user->isBlocked()) {
            return $response->setErrors([
                'login' => 'blocked'
            ])->json();
        }

        $token = new UsernamePasswordToken(
            $user->getUsername(),
            $password,
           'user_area',
           $user->getRoles()
        );
        $auth_token = $am->authenticate($token);
        $token_storage->setToken($auth_token);
        $response->setLogged(true);
        $response->setData([
            'user' => $user->json()
        ]);

        return $response->setSuccess()->json();

    }

}