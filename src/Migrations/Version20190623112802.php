<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190623112802 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE mailing_item ADD sender_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE mailing_item ADD CONSTRAINT FK_4E17AEA9F624B39D FOREIGN KEY (sender_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_4E17AEA9F624B39D ON mailing_item (sender_id)');
        $this->addSql('ALTER TABLE event ADD parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7727ACA70 FOREIGN KEY (parent_id) REFERENCES event (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7727ACA70 ON event (parent_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7727ACA70');
        $this->addSql('DROP INDEX IDX_3BAE0AA7727ACA70 ON event');
        $this->addSql('ALTER TABLE event DROP parent_id');
        $this->addSql('ALTER TABLE mailing_item DROP FOREIGN KEY FK_4E17AEA9F624B39D');
        $this->addSql('DROP INDEX IDX_4E17AEA9F624B39D ON mailing_item');
        $this->addSql('ALTER TABLE mailing_item DROP sender_id');
    }
}
