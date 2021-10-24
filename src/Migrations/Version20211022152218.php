<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211022152218 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620DEBA72DF');
        $this->addSql('DROP INDEX IDX_140AB620DEBA72DF ON page');
        $this->addSql('ALTER TABLE page DROP format');
        $this->addSql('ALTER TABLE format ADD page INT DEFAULT NULL');
        $this->addSql('ALTER TABLE format ADD CONSTRAINT FK_DEBA72DF140AB620 FOREIGN KEY (page) REFERENCES page (id)');
        $this->addSql('CREATE INDEX IDX_DEBA72DF140AB620 ON format (page)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE format DROP FOREIGN KEY FK_DEBA72DF140AB620');
        $this->addSql('DROP INDEX IDX_DEBA72DF140AB620 ON format');
        $this->addSql('ALTER TABLE format DROP page');
        $this->addSql('ALTER TABLE page ADD format INT DEFAULT NULL');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620DEBA72DF FOREIGN KEY (format) REFERENCES format (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_140AB620DEBA72DF ON page (format)');
    }
}
