<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211004112536 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE travel_group_traveler (travel_group_id INT NOT NULL, traveler_id INT NOT NULL, INDEX IDX_76B5A1249425BA02 (travel_group_id), INDEX IDX_76B5A12459BBE8A3 (traveler_id), PRIMARY KEY(travel_group_id, traveler_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE travel_group_traveler ADD CONSTRAINT FK_76B5A1249425BA02 FOREIGN KEY (travel_group_id) REFERENCES travel_group (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE travel_group_traveler ADD CONSTRAINT FK_76B5A12459BBE8A3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE travel_group_traveler');
    }
}
