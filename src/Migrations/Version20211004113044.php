<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211004113044 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE adventure_traveler (adventure_id INT NOT NULL, traveler_id INT NOT NULL, INDEX IDX_22CB5D2955CF40F9 (adventure_id), INDEX IDX_22CB5D2959BBE8A3 (traveler_id), PRIMARY KEY(adventure_id, traveler_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE adventure_traveler ADD CONSTRAINT FK_22CB5D2955CF40F9 FOREIGN KEY (adventure_id) REFERENCES adventure (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE adventure_traveler ADD CONSTRAINT FK_22CB5D2959BBE8A3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE adventure_traveler');
    }
}
