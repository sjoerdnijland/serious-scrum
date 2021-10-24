<?php

namespace App\Repository;

use App\Entity\Traveler;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Traveler|null find($id, $lockMode = null, $lockVersion = null)
 * @method Traveler|null findOneBy(array $criteria, array $orderBy = null)
 * @method Traveler[]    findAll()
 * @method Traveler[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TravelerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Traveler::class);
    }

    public function findActive()
    {
        return $this->createQueryBuilder('t')
            ->where('t.isActive = 1')
            ->getQuery()
            ->getResult();
    }

    public function findOneByEmail($email)
    {
        return $this->createQueryBuilder('t')
            ->where('t.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findGuides()
    {
        return $this->createQueryBuilder('t')
            ->where('t.isGuide = 1')
            ->getQuery()
            ->getResult();
    }

}
