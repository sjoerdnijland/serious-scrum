<?php

namespace App\Command;

use App\Controller\ArticleController;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ReloadCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:reload';
    protected static $defaultDescription = 'Reloads cache for articles and categories.';
    // private $articleController;

    public function __construct(ArticleController $articleController)
    {
        $this->articleController = $articleController;

        parent::__construct();
    }

    protected function configure()
    {
        $this->setHelp('This command allows you to reloads cache for articles and categories...')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // ... put here the code to run in your command
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            'Reload',
            '============',
            '',
        ]);

        $this->articleController->reloadActive();

        return \Symfony\Component\Console\Command\Command::FAILURE;

        // this method must return an integer number with the "exit status code"
        // of the command. You can also use these constants to make code more readable

        // return this if there was no problem running the command
        // (it's equivalent to returning int(0))
        // return Command::SUCCESS;

        // or return this if some error happened during the execution
        // (it's equivalent to returning int(1))
        // return Command::FAILURE;
        return Command::SUCCESS;
    }
}
