<?php

namespace App\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class GoogleController extends AbstractController
{
    public function __construct(private SessionInterface $session)
    {
    }

    /**
     * Link to this controller to start the "connect" process.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    #[Route(path: '/connect/google', name: 'connect_google')]
    public function connectAction(ClientRegistry $clientRegistry)
    {
        return $clientRegistry
            ->getClient('google')
            ->redirect([], [
                'prompt' => 'consent',
            ]);
    }

    /**
     * Google redirects to back here afterwards.
     *
     * @param Request $request
     */
    #[Route(path: '/connect/google/check', name: 'connect_google_check')]
    public function connectCheckAction(): JsonResponse|\Symfony\Component\HttpFoundation\RedirectResponse
    {
        if (!$this->getUser()) {
            return new JsonResponse(['status' => false, 'message' => 'User not found!']);
        } else {
            return $this->redirectToRoute('index');
        }
    }
}
