<?php

namespace App\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CronJob;
use App\Service\CronJobService;

class CheckCronJobsCommand extends ContainerAwareCommand
{

    private $em;
    private $jobService;

    public function __construct(EntityManagerInterface $em, CronJobService $job_service)
    {
        $this->em = $em;
        $this->jobService = $job_service;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('check_cron_jobs');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $jobs = $this->em->getRepository(CronJob::class)->getOldJobs();

        foreach ($jobs as $job) {

            $command_name = $job->getCommand();
            $command = $this->getApplication()->find($command_name);
            $arguments = $job->getArguments();
            $arguments = $arguments ? array_merge($arguments, ['command' => $command_name]) : ['command' => $command_name];
            $greetInput = new ArrayInput($arguments);
            $execute = $command->run($greetInput, $output);
            $this->jobService->removeJob($job);

        }

    }

}