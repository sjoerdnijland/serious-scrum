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
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    /**
     * Link to this controller to start the "connect" process.
     *
     * @Route("/connect/google", name="connect_google")
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
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
     * @Route("/connect/google/check", name="connect_google_check")
     *
     * @param Request $request
     *
     * @return JsonResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function connectCheckAction()
    {
        if (!$this->getUser()) {
            return new JsonResponse(['status' => false, 'message' => 'User not found!']);
        } else {
            if ($this->session->get('patreonLogin')) {
                $this->session->set('patreonLogin', false);

                return $this->redirectToRoute('patreon');
            }

            return $this->redirectToRoute('index');
        }
    }
}
