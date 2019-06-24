<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;
use App\View\AjaxResponse;
use App\Entity\Mailing;
use App\Entity\MailingItem;
use App\Service\MailerService;
use App\Service\CronJobService;

/**
 * @Route("/api/mailing-item/")
 */
class MailingItemController extends AbstractController
{

    /**
     * @Route("new", name="new_mailing-item_api")
     */
    public function newMailingItemApiAction(Request $request, AjaxResponse $response)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();
        $theme = $request->request->get('theme');
        $sendTime = $request->request->get('sendTime');
        $sendTime = $sendTime ? new \DateTime(preg_replace('/\s\(.*\)/i', '', $sendTime)) : null;
        $nowSend = $request->request->get('nowSend');
        $mailing_id = $request->request->get('mailing');
        $selected_emails = json_decode($request->request->get('selectedEmails'));

        if (!$theme || !$mailing_id) {

            $errors = [];

            if (!$theme) $errors['theme'] = 'empty';
            if (!$theme) $errors['mailing'] = 'empty';

            return $response->setErrors($errors)->json();

        }

        $mailing = $em->getRepository(Mailing::class)->find($mailing_id);

        if (!$mailing) return $response->setMessage('')->json();

        $new_mailing_item = new MailingItem();
        $new_mailing_item->setTheme($theme)->setMailing($mailing);

        if ($sendTime) $new_mailing_item->setSendTime($sendTime);
        if ($nowSend) $new_mailing_item->setNowSend($nowSend);
        if (is_array($selected_emails)) $new_mailing_item->setSelectedEmails($selected_emails);

        $em->persist($new_mailing_item);
        $em->flush();

        return $response->setSuccess()->json();

    }

    /**
     * @Route("{id}/update", name="update_mailing-item_api")
     */
    public function updateMailingItemApiAction(Request $request, AjaxResponse $response, $id)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('mailing-item id not found')->json();

        $mailing_item = $em->getRepository(MailingItem::class)->find($id);

        if (!$mailing_item) return $response->setMessage('')->json();

        $theme = $request->request->get('theme');
        $sendTime = $request->request->get('sendTime');
        $sendTime = $sendTime ? new \DateTime($sendTime) : null;
        $nowSend = $request->request->get('nowSend');
        $mailing_id = $request->request->get('mailing');
        $selected_emails = json_decode($request->request->get('selectedEmails'));

        if (!$theme || !$mailing_id) {

            $errors = [];

            if (!$theme) $errors['theme'] = 'empty';
            if (!$theme) $errors['mailing'] = 'empty';

            return $response->setErrors($errors)->json();

        }

        $mailing = $em->getRepository(Mailing::class)->find($mailing_id);

        if (!$mailing) return $response->setMessage('')->json();

        $mailing_item->setTheme($theme)->setMailing($mailing)->setNowSend(!!$nowSend);

        if ($sendTime) $mailing_item->setSendTime($sendTime);
        if (is_array($selected_emails)) $mailing_item->setSelectedEmails($selected_emails);

        $em->flush();

        return $response->setSuccess()->json();

    }

    /**
     * @Route("{id}/send-mails/now", name="send-now-mails_mailing-item_api")
     */
    public function sendNowMailsMailingItemApiAction(Request $request, AjaxResponse $response, $id, UserInterface $user = null, MailerService $mailer, CronJobService $cron_job_service)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('mailing-item id not found')->json();

        $mailing_item = $em->getRepository(MailingItem::class)->find($id);

        if (!$mailing_item) return $response->setMessage('')->json();
        if ($mailing_item->getStatus() == 1) return $response->setMessage('')->json();

        $mailer->sendMails($mailing_item);
        $mailing_item->setStatus(1)->setSender($user);
        $cron_job_service->createDelayJob('mailer:setSendMailsData', '+5 minutes');
        $em->flush();

        return $response->setSuccess()->json();

    }

    /**
     * @Route("{id}/send-mails/scheduled", name="send-planning-mails_mailing-item_api")
     */
    public function sendPlanningMailsMailingItemApiAction(Request $request, AjaxResponse $response, $id, UserInterface $user = null, CronJobService $cron_job_service)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('mailing-item id not found')->json();

        $mailing_item = $em->getRepository(MailingItem::class)->find($id);

        if (!$mailing_item) return $response->setMessage('')->json();
        if ($mailing_item->getStatus() == 1) return $response->setMessage('')->json();

        $mailing_item->setSender($user);
        $cron_job_service->createScheduledJob('mailer:addSendScheduledMails', $mailing_item->getSendTime(), ['mailingItemId' => $mailing_item->getId()]);

        return $response->setSuccess()->json();

    }

}