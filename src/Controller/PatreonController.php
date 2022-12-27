<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Squid\Patreon\Exceptions\OAuthReturnedError;
use Squid\Patreon\OAuth;
use Squid\Patreon\Patreon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class PatreonController extends AbstractController
{
    private $session;
    private $em;

    public function __construct(EntityManagerInterface $entityManager, SessionInterface $session)
    {
        $this->em = $entityManager;
        $this->session = $session;
    }

    /**
     * Link to this controller to start the "connect" process.
     *
     * @Route("/patreon/login", name="login_patreon")
     */
    public function patreonLogin(): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        $em = $this->em;
        // Create a new OAuth client using the values from .env
        $oauth = new OAuth(
            $_SERVER['PATREON_CLIENT_ID'],
            $_SERVER['PATREON_CLIENT_SECRET'],
            $_SERVER['PATREON_REDIRECT_URI']
        );

        // If the request does not have a `code` parameter then it means that they have
        // not been sent here by Patreon, so we need to redirect them to the Patreon
        // login page.
        if (!isset($_GET['code'])) {
            header("Location: {$oauth->getAuthorizationUrl()}");
            exit;
        }

        // If the request has got this far it means that there is a `code` parameter
        // which we can use to send to Patreon and get an access token (and refresh token)
        // in return. This access token can then be used to request the users information
        // from Patreon using the Patreon client.
        try {
            $tokens = $oauth->getAccessToken($_GET['code']);
        } catch (OAuthReturnedError $e) {
            $this->getUser()->setIsPatreon(false);
            $em->persist($this->getUser());
            $em->flush();
            echo "An error occurred completing your login: {$e->getMessage()}";
            exit;
        }

        // Save their access token to their session so that when they visit subsequent
        // pages on the website we can send requests to Patreon on their behalf.
        $this->session->set('patreonToken', $tokens['access_token']);

        // Create a new Patreon client using the access token we've obtained from the
        // user who just logged in. This allows us access to the user's information,
        // including their pledge to the creator's campaign.
        $patron = new Patreon($this->session->get('patreonToken'));

        // Get the logged in User, this returns a Squid\Patreon\Entities\User
        $patreonSupporter = $patron->me()->get();

        if (!$patreonSupporter->hasActivePledge()) {
            $this->getUser()->setIsPatreon(false);
            $em->persist($this->getUser());
            $em->flush();

            return $this->redirectToRoute('patreon');
        }

        if (!$patreonSupporter->pledge->hasReward()) {
            $this->getUser()->setIsPatreon(false);
            $em->persist($this->getUser());
            $em->flush();

            return $this->redirectToRoute('patreon');
        }

        if ($patreonSupporter->pledge->reward->title == 'Serious Mastery' || $patreonSupporter->pledge->reward->title == 'Superscrummyagilisticexpialidocious!') {
            if ($this->isGranted('ROLE_USER')) {
                $this->getUser()->setIsPatreon(true);

                $em->persist($this->getUser());
                $em->flush();

                if ($this->session->get('page')) {
                    return $this->redirectToRoute('page', ['slug' => $this->session->get('page')]);
                }
            }
        }

        return $this->redirectToRoute('patreon');
    }
}
