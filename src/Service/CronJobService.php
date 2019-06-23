<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CronJob;

class CronJobService
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function createDelayJob(?string $command, ?string $time_modilfy, $arguments = false)
    {

        $time = new \DateTime('now');
        $time = $time->modify($time_modilfy);
        $new_job = new CronJob();
        $new_job->setCommand($command)->setLeadTime($time);

        if (is_array($arguments)) $new_job->setArguments($arguments);

        $this->em->persist($new_job);
        $this->em->flush();

        return true;

    }

    public function createScheduledJob(?string $command, $time, $arguments = false)
    {

        $new_job = new CronJob();
        $new_job->setCommand($command)->setLeadTime($time);

        if (is_array($arguments)) $new_job->setArguments($arguments);

        $this->em->persist($new_job);
        $this->em->flush();

        return true;

    }

    public function removeJob(?CronJob $job)
    {
        $this->em->remove($job);
        $this->em->flush();
    }

}