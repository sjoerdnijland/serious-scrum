<?php

namespace App\Command;

use App\Manager\RssManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class RssCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:rss';
    protected static $defaultDescription = 'Loads RSS articles.';

    public function __construct(RssManager $rssManager)
    {
        $this->rssManager = $rssManager;

        parent::__construct();
    }

    protected function configure()
    {
        $this->setHelp('This command allows you to load articles from Medium serious scrum...')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // ... put here the code to run in your command
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            'Fetch RSS',
            '============',
            '',
        ]);

        $rss = $this->rssManager->getRSS('https://medium.com/feed/serious-scrum', 'command');

        return Command::FAILURE;
    }
}
