<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230116190338 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE adventure_traveler DROP FOREIGN KEY FK_22CB5D2955CF40F9');
        $this->addSql('ALTER TABLE certificate_traveler DROP FOREIGN KEY FK_7E789EE099223FFD');
        $this->addSql('DROP TABLE adventure');
        $this->addSql('DROP TABLE adventure_traveler');
        $this->addSql('DROP TABLE certificate');
        $this->addSql('DROP TABLE certificate_traveler');
        $this->addSql('ALTER TABLE page CHANGE labels labels JSON NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE adventure (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, is_active TINYINT(1) NOT NULL, link VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, price VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, payment_link VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, launch_at DATETIME DEFAULT NULL, duration INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE adventure_traveler (adventure_id INT NOT NULL, traveler_id INT NOT NULL, INDEX IDX_22CB5D2955CF40F9 (adventure_id), INDEX IDX_22CB5D2959BBE8A3 (traveler_id), PRIMARY KEY(adventure_id, traveler_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE certificate (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, image VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE certificate_traveler (certificate_id INT NOT NULL, traveler_id INT NOT NULL, INDEX IDX_7E789EE059BBE8A3 (traveler_id), INDEX IDX_7E789EE099223FFD (certificate_id), PRIMARY KEY(certificate_id, traveler_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE adventure_traveler ADD CONSTRAINT FK_22CB5D2955CF40F9 FOREIGN KEY (adventure_id) REFERENCES adventure (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE adventure_traveler ADD CONSTRAINT FK_22CB5D2959BBE8A3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE certificate_traveler ADD CONSTRAINT FK_7E789EE059BBE8A3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE certificate_traveler ADD CONSTRAINT FK_7E789EE099223FFD FOREIGN KEY (certificate_id) REFERENCES certificate (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE page CHANGE labels labels JSON NOT NULL COMMENT \'(DC2Type:json_array)\'');
    }
}
