<?php

namespace App\View;

use Symfony\Component\HttpFoundation\JsonResponse;

class AjaxResponse implements \JsonSerializable
{

    private $logged = false;
    private $success = false;
    private $message = '';
    private $errors = [];
    private $data = [];
    private $redirect = '';

    public function isLogged(): ?bool
    {
        return $this->logged;
    }

    public function setLogged(?bool $status = true): ?self
    {
        $this->logged = $status;
        return $this;
    }

    public function isSuccess(): ?bool
    {
        return $this->success;
    }

    public function setSuccess(?bool $status = true): ?self
    {
        $this->success = $status;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): ?self
    {
        $this->message = $message;
        return $this;
    }

    public function getErrors(): ?array
    {
        return $this->errors;
    }

    public function setErrors(?array $errors): ?self
    {
        $this->errors = $errors;
        return $this;
    }

    public function getData(): ?array
    {
        return $this->data;
    }

    public function setData(?array $data): ?self
    {
        $this->data = $data;
        return $this;
    }

    public function getRedirect(): ?string
    {
        return $this->redirect;
    }

    public function setRedirect(?string $url): ?self
    {
        $this->redirect = $url;
        return $this;
    }

    public function jsonSerialize()
    {

        $serialize = [
            'logged' => $this->isLogged(),
            'success' => $this->isSuccess()
        ];

        if ($this->getMessage()) {
            $serialize['message'] = $this->getMessage();
        }

        if ($this->getErrors()) {
            $serialize['errors'] = $this->getErrors();
        }

        if ($this->getData()) {
            $serialize['data'] = $this->getData();
        }

        if ($this->getRedirect()) {
            $serialize['redirect'] = $this->getRedirect();
        }

        return $serialize;
    }

    public function json()
    {
        return new JsonResponse($this);
    }

}