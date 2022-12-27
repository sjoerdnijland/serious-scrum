<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

// use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
// use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class SubscribeController extends AbstractController
{
    /**
     * @param Request
     * @param EngineInterface
     *
     * @Route("/slack", name="slack_subscribe")
     * @Method("GET")
     */
    public function inviteToSlack(Request $request)
    {
        $email = $request->query->get('email');

        // CREATING A SLACK INVITE (from levels.io)
        date_default_timezone_set('America/Los_Angeles');
        mb_internal_encoding('UTF-8');

        // your slack team/host name
        // $slackHostName='athleticdevelopment';
        // $slackAuthToken='xoxp-265304619649-265873391076-266914024887-cb9ef7435d62ae6646055a76f0d69d6a';
        // $slackInviteUrl='https://'.$slackHostName.'.slack.com/api/users.admin.invite?t='.time();
        // $slackAutoJoinChannels='C7USNE9AB';

        $slackHostName = 'serious-scrum';
        $slackAuthToken = 'xoxp-339336174519-338194545539-648718581700-cdc86f417adb3d37db82639694b6baaa';
        $slackInviteUrl = 'https://'.$slackHostName.'.slack.com/api/users.admin.invite?t='.time();
        // $slackAutoJoinChannels='C7USNE9AB';

        $fields = [
            'email' => urlencode($email),
            'channels' => '',
            'first_name' => '',
            'token' => $slackAuthToken,
            'set_active' => urlencode('true'),
            '_attempts' => '1',
        ];

        // url-ify the data for the POST
        $fields_string = '';
        foreach ($fields as $key => $value) {
            $fields_string .= $key.'='.$value.'&';
        }
        rtrim($fields_string, '&');

        // open connection
        $ch = curl_init();

        // set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $slackInviteUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

        // exec
        $replyRaw = curl_exec($ch);
        $reply = json_decode($replyRaw, true);

        $response = new Response();
        $response->setContent($replyRaw);
        $response->setStatusCode(Response::HTTP_OK);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
