<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Manager\PrismicManager;

class PrismicCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:prismic';


    public function __construct(PrismicManager $prismicManager)
    {
        $this->prismicManager = $prismicManager;

        parent::__construct();
    }



    protected function configure()
    {
        $this
            // the short description shown while running "php bin/console list"
            ->setDescription('Loads Prismic CMS pages.')

            // the full command description shown when running the command with
            // the "--help" option
            ->setHelp('This command allows you to load pages from Prismic CMS | Serious Scrum - Road to Mastery...')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // ... put here the code to run in your command
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $output->writeln([
            'Fetch last 20 Prismic Pages',
            '============',
            '',
        ]);

        $this->prismicManager->getPrismicPages();

        return 1;

        // this method must return an integer number with the "exit status code"
        // of the command. You can also use these constants to make code more readable

        // return this if there was no problem running the command
        // (it's equivalent to returning int(0))
        //return Command::SUCCESS;

        // or return this if some error happened during the execution
        // (it's equivalent to returning int(1))
        // return Command::FAILURE;
    }
}
