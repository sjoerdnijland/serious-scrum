<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use League\OAuth2\Client\Provider\GoogleUser;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;


class GoogleAuthenticator extends OAuth2Authenticator implements AuthenticationEntrypointInterface
{
    public function __construct(private ClientRegistry $clientRegistry, private EntityManagerInterface $em, private RouterInterface $router)
    {
    }

    public function supports(Request $request):bool
    {
        return $request->getPathInfo() == '/connect/google/check' && $request->isMethod('GET');
    }



    public function getCredentials(Request $request)
    {
        return $this->fetchAccessToken($this->getGoogleClient());
    }

    public function authenticate(Request $request): Passport
    {
        $client = $this->getGoogleClient();
        $accessToken =$this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), function() use ($accessToken, $client) {
                /** @var GoogleUser $googleUser */
                $googleUser = $this->getGoogleClient()
                    ->fetchUserFromToken($accessToken);

                $email = $googleUser->getEmail();

                $existingUser = $this->em->getRepository(User::class)
                    ->findOneByEmail($email);

                if ($existingUser) {
                    return $existingUser;
                }

                $user = new User();
                $user->setEmail($googleUser->getEmail());
                $user->setFullname($googleUser->getName());
                $user->setAvatar($googleUser->getAvatar());
                $user->setCreatedAt(new \DateTime(date('Y-m-d H:i:s')));
                $this->em->persist($user);
                $this->em->flush();

                return $user;
            })
        );
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        /** @var GoogleUser $googleUser */
        $googleUser = $this->getGoogleClient()
            ->fetchUserFromToken($credentials);

        $email = $googleUser->getEmail();

        $user = $this->em->getRepository(User::class)
            ->findOneByEmail($email);

        if (!$user) {
            $user = new User();
            $user->setEmail($googleUser->getEmail());
            $user->setFullname($googleUser->getName());
            $user->setAvatar($googleUser->getAvatar());
            $user->setCreatedAt(new \DateTime(date('Y-m-d H:i:s')));
            $this->em->persist($user);
            $this->em->flush();
        }

        return $user;
    }

    /**
     * @return \KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface
     */
    private function getGoogleClient()
    {
        return $this->clientRegistry
            ->getClient('google');
    }

    /**
     * Returns a response that directs the user to authenticate.
     *
     * This is called when an anonymous request accesses a resource that
     * requires authentication. The job of this method is to return some
     * response that "helps" the user start into the authentication process.
     *
     * Examples:
     *  A) For a form login, you might redirect to the login page
     *      return new RedirectResponse('/login');
     *  B) For an API token authentication system, you return a 401 response
     *      return new Response('Auth header required', 401);
     *
     * @param Request                                                            $request       The request that resulted in an AuthenticationException
     * @param AuthenticationException $authException The exception that started the authentication process
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function start(Request $request, AuthenticationException $authException = null): \Symfony\Component\HttpFoundation\Response
    {
        return new RedirectResponse('/login');
    }

    /**
     * Called when authentication executed, but failed (e.g. wrong username password).
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the login page or a 403 response.
     *
     * If you return null, the request will continue, but the user will
     * not be authenticated. This is probably not what you want to do.
     *
     * @return \Symfony\Component\HttpFoundation\Response|null
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        return new RedirectResponse('/error');
    }

    /**
     * Called when authentication executed and was successful!
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the last page they visited.
     *
     * If you return null, the current request will continue, and the user
     * will be authenticated. This makes sense, for example, with an API.
     *
     * @param string $providerKey The provider (i.e. firewall) key
     *
     * @return void
     */
    public function onAuthenticationSuccess(Request $request, \Symfony\Component\Security\Core\Authentication\Token\TokenInterface $token, string $firewallName):  ?Response
    {
        return new RedirectResponse('/');
    }
}
