<?php


namespace App\Controller;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Validator\Constraints\DateTime;

class JiraController
{
    private $credentials;
    /**
     * @var ClientInterface
     */
    private $client;


    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;

    }


    public function getIssuesFromJira($team)
    {
        $issues = [];
        $startAt = 0;
        $maxResults = 50;
        $total = 99;

        $call = 0; // 0 = 'Ready', 1 = 'Backlog';

        //ordering (RANK) gaat niet goed als je 'backlog' en 'ready' tegelijk ophaalt. Vandaar dat het gesplitst is.
        $jql[0] = urlencode("category = ".$team." AND issuetype != Epic AND (labels is EMPTY OR labels not in (Vervallen, vervallen)) AND status  in (Ready) ORDER BY Rank");
        $jql[1] = urlencode("category = ".$team." AND issuetype != Epic AND (labels is EMPTY OR labels not in (Vervallen, vervallen)) AND status  in (Backlog) ORDER BY Rank");

        $sizes = ['XS' => 0.25,'S'=> 1, 'M'=> 3, 'L'=> 8, 'XL'=> 16];

        echo('<pre>');
        print_r($sizes);
        echo('</pre>');

        while($call < 2){

            $res = $this->client->request(
                'GET',
                'https://triggerfish-ops.atlassian.net/rest/api/2/search?jql=' . $jql[$call] . '&startAt=' . $startAt,
                [
                    'headers' => [
                        'Authorization' => 'Basic ' . 'c2pvZXJkQHRyaWdnZXJmaXNoLm5sOklLcmRGUDd4STRiUXZhWWZKVkNrNDA1QQ==',
                    ],
                ]
            );

    
            $loadIssues = json_decode($res->getContent(),1);

            #geef jira resultaten weer
            #echo('<pre>'); print_r($loadIssues); echo('</pre>');

            $maxResults = $loadIssues['maxResults']; //jira geeft terug hoeveel issues er totaal zijn.

            $startAt += $maxResults; //jira haalt issues in sets van 50 op. Dit zet het startpunt voor de volgende call.

            if(($startAt+$maxResults) > $total || $total >= $maxResults){ //als call van 0 naar 1 gaat switch van Ready naar Backlog. Als alle issues van Backlog zijn opgehaald wordt call opgehoogd naar 2 en dan eindigt de while loop.
                $call++;
                $startAt = 0;
            }

            $total = $loadIssues['total'];
    
            $sum = 0;
    
            foreach($loadIssues['issues'] as $i => $newIssue){

                $issue = [];
                $issue['key'] = $newIssue['key'];
                $issue['summary'] = $newIssue['fields']['summary'];

                $issue['value'] = "€ 0";
                $issue['bv'] =  $newIssue['fields']['customfield_10016']; //business value

                $issue['size'] = '';
                $issue['sp'] = 3; // als er geen size is ingestelt, dan is de standaard waarde 3. SP vertegenwoordigt hier complexiteit.

               foreach($newIssue['fields'] as $key => $value){
                   if(!isset($value['value'])){
                       continue;
                   }

                   if(!isset($sizes[$value['value']])) {
                       continue;
                   }
                   $issue['size'] =  $value['value'];
                   $issue['sp'] =  $sizes[$value['value']];

               }


               if(isset($newIssue['fields']['customfield_10016'])){
                   $issue['value'] = '€ '.$newIssue['fields']['customfield_10016']*100;
                   $sum += $newIssue['fields']['customfield_10016'];

                }

                $issues[] = $issue;
            }
        }


        return $issues;
    }


    public function getDoneIssuesFromJira($team)
    {

        $issues = [];
        $startAt = 0;
        $maxResults = 50;
        $total = 99;

        $jql = urlencode("category = ".$team." AND issuetype != Epic AND (labels is EMPTY OR labels not in (Vervallen, vervallen)) AND resolutiondate > -30d ORDER BY resolutiondate DESC");

        $sizes = ['XS' => 0.25,'S'=> 1, 'M'=> 3, 'L'=> 8, 'XL'=> 16];

        $call = true;

        while($call){

            $res = $this->client->request(
                'GET',
                'https://triggerfish-ops.atlassian.net/rest/api/2/search?jql=' . $jql . '&startAt=' . $startAt,
                [
                    'headers' => [
                        'Authorization' => 'Basic ' . 'c2pvZXJkQHRyaWdnZXJmaXNoLm5sOklLcmRGUDd4STRiUXZhWWZKVkNrNDA1QQ==',
                    ],
                ]
            );


            $loadIssues = json_decode($res->getContent(),1);

            #geef jira resultaten weer
            #echo('<pre>'); print_r($loadIssues); echo('</pre>'); die();

            $maxResults = $loadIssues['maxResults']; //jira geeft terug hoeveel issues er totaal zijn.

            $startAt += $maxResults; //jira haalt issues in sets van 50 op. Dit zet het startpunt voor de volgende call.

            $total = $loadIssues['total'];

            if(($startAt+$maxResults) > $total || ($startAt == 0 && $total <= $maxResults)){ //stop calling
                $call = false;
            }

            $sum = 0;

            foreach($loadIssues['issues'] as $i => $newIssue){

                $issue = [];
                $issue['key'] = $newIssue['key'];
                $issue['summary'] = $newIssue['fields']['summary'];
                $issue['resolutiondate'] = $newIssue['fields']['resolutiondate'];

                //$date = new DateTime($issue['resolutiondate']);
                //$issue['week'] = $date->format("W");

                $issue['week'] = date("W", strtotime( $issue['resolutiondate']));

                $issue['value'] = "€ 0";
                $issue['bv'] =  $newIssue['fields']['customfield_10016']; //business value

                $issue['size'] = '';
                $issue['sp'] = 3; // als er geen size is ingestelt, dan is de standaard waarde 3. SP vertegenwoordigt hier complexiteit.

                foreach($newIssue['fields'] as $key => $value){
                    if(!isset($value['value'])){
                        continue;
                    }

                    if(!isset($sizes[$value['value']])) {
                        continue;
                    }
                    $issue['size'] =  $value['value'];
                    $issue['sp'] =  $sizes[$value['value']];

                }


                if(isset($newIssue['fields']['customfield_10016'])){
                    $issue['value'] = '€ '.$newIssue['fields']['customfield_10016']*100;
                    $sum += $newIssue['fields']['customfield_10016'];

                }

                $issues[] = $issue;
            }
        }


        return $issues;
    }

}
