<?php

namespace App\Repository;

use App\Entity\Adventure;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Adventure|null find($id, $lockMode = null, $lockVersion = null)
 * @method Adventure|null findOneBy(array $criteria, array $orderBy = null)
 * @method Adventure[]    findAll()
 * @method Adventure[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdventureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Adventure::class);
    }

    public function findActive()
    {
        return $this->createQueryBuilder('a')
            ->where('a.isActive = 1')
            ->getQuery()
            ->getResult();
    }

    public function findOneByName($name)
    {
        return $this->createQueryBuilder('a')
            ->where('a.name = :name')
            ->setParameter('name', $name)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
