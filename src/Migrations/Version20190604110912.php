<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190604110912 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE email (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, contractor_id INT DEFAULT NULL, contact_person_id INT DEFAULT NULL, name VARCHAR(128) DEFAULT NULL, email VARCHAR(64) NOT NULL, order_index INT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_E7927C7419EB6921 (client_id), INDEX IDX_E7927C74B0265DC7 (contractor_id), INDEX IDX_E7927C744F8A983C (contact_person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mailing_item (id INT AUTO_INCREMENT NOT NULL, mailing_id INT DEFAULT NULL, send_time DATETIME NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_4E17AEA93931AB76 (mailing_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact_person (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, contractor_id INT DEFAULT NULL, name VARCHAR(64) DEFAULT NULL, last_name VARCHAR(128) DEFAULT NULL, patronymic VARCHAR(128) DEFAULT NULL, position VARCHAR(128) DEFAULT NULL, description LONGTEXT DEFAULT NULL, order_index INT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_A44EE6F719EB6921 (client_id), INDEX IDX_A44EE6F7B0265DC7 (contractor_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mailing (id INT AUTO_INCREMENT NOT NULL, template_id INT DEFAULT NULL, name VARCHAR(128) NOT NULL, description LONGTEXT DEFAULT NULL, structure LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', archive TINYINT(1) NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_3ED9315E5DA0FB8 (template_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mail (id INT AUTO_INCREMENT NOT NULL, email_id INT DEFAULT NULL, mailing_item_id INT DEFAULT NULL, send_time DATETIME NOT NULL, send TINYINT(1) NOT NULL, status INT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_5126AC48A832C1C9 (email_id), INDEX IDX_5126AC483BFB731 (mailing_item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contractor (id INT AUTO_INCREMENT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, name VARCHAR(256) NOT NULL, city VARCHAR(256) DEFAULT NULL, post_index VARCHAR(16) DEFAULT NULL, address VARCHAR(512) DEFAULT NULL, description LONGTEXT DEFAULT NULL, priority VARCHAR(128) DEFAULT NULL, source VARCHAR(128) DEFAULT NULL, group_type VARCHAR(256) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mail_template (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, server_name VARCHAR(256) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE phone (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, contractor_id INT DEFAULT NULL, contact_person_id INT DEFAULT NULL, name VARCHAR(128) DEFAULT NULL, phone VARCHAR(24) NOT NULL, order_index INT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_444F97DD19EB6921 (client_id), INDEX IDX_444F97DDB0265DC7 (contractor_id), INDEX IDX_444F97DD4F8A983C (contact_person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, name VARCHAR(256) NOT NULL, city VARCHAR(256) DEFAULT NULL, post_index VARCHAR(16) DEFAULT NULL, address VARCHAR(512) DEFAULT NULL, description LONGTEXT DEFAULT NULL, priority VARCHAR(128) DEFAULT NULL, source VARCHAR(128) DEFAULT NULL, group_type VARCHAR(256) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE site (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, contractor_id INT DEFAULT NULL, name VARCHAR(128) DEFAULT NULL, url VARCHAR(128) NOT NULL, order_index INT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_694309E419EB6921 (client_id), INDEX IDX_694309E4B0265DC7 (contractor_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE social (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, contractor_id INT DEFAULT NULL, contact_person_id INT DEFAULT NULL, name VARCHAR(128) DEFAULT NULL, link VARCHAR(256) NOT NULL, order_index INT NOT NULL, created_time DATETIME DEFAULT NULL, updated_time DATETIME DEFAULT NULL, INDEX IDX_7161E18719EB6921 (client_id), INDEX IDX_7161E187B0265DC7 (contractor_id), INDEX IDX_7161E1874F8A983C (contact_person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE email ADD CONSTRAINT FK_E7927C7419EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE email ADD CONSTRAINT FK_E7927C74B0265DC7 FOREIGN KEY (contractor_id) REFERENCES contractor (id)');
        $this->addSql('ALTER TABLE email ADD CONSTRAINT FK_E7927C744F8A983C FOREIGN KEY (contact_person_id) REFERENCES contact_person (id)');
        $this->addSql('ALTER TABLE mailing_item ADD CONSTRAINT FK_4E17AEA93931AB76 FOREIGN KEY (mailing_id) REFERENCES mailing (id)');
        $this->addSql('ALTER TABLE contact_person ADD CONSTRAINT FK_A44EE6F719EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE contact_person ADD CONSTRAINT FK_A44EE6F7B0265DC7 FOREIGN KEY (contractor_id) REFERENCES contractor (id)');
        $this->addSql('ALTER TABLE mailing ADD CONSTRAINT FK_3ED9315E5DA0FB8 FOREIGN KEY (template_id) REFERENCES mail_template (id)');
        $this->addSql('ALTER TABLE mail ADD CONSTRAINT FK_5126AC48A832C1C9 FOREIGN KEY (email_id) REFERENCES email (id)');
        $this->addSql('ALTER TABLE mail ADD CONSTRAINT FK_5126AC483BFB731 FOREIGN KEY (mailing_item_id) REFERENCES mailing_item (id)');
        $this->addSql('ALTER TABLE phone ADD CONSTRAINT FK_444F97DD19EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE phone ADD CONSTRAINT FK_444F97DDB0265DC7 FOREIGN KEY (contractor_id) REFERENCES contractor (id)');
        $this->addSql('ALTER TABLE phone ADD CONSTRAINT FK_444F97DD4F8A983C FOREIGN KEY (contact_person_id) REFERENCES contact_person (id)');
        $this->addSql('ALTER TABLE site ADD CONSTRAINT FK_694309E419EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE site ADD CONSTRAINT FK_694309E4B0265DC7 FOREIGN KEY (contractor_id) REFERENCES contractor (id)');
        $this->addSql('ALTER TABLE social ADD CONSTRAINT FK_7161E18719EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE social ADD CONSTRAINT FK_7161E187B0265DC7 FOREIGN KEY (contractor_id) REFERENCES contractor (id)');
        $this->addSql('ALTER TABLE social ADD CONSTRAINT FK_7161E1874F8A983C FOREIGN KEY (contact_person_id) REFERENCES contact_person (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE mail DROP FOREIGN KEY FK_5126AC48A832C1C9');
        $this->addSql('ALTER TABLE mail DROP FOREIGN KEY FK_5126AC483BFB731');
        $this->addSql('ALTER TABLE email DROP FOREIGN KEY FK_E7927C744F8A983C');
        $this->addSql('ALTER TABLE phone DROP FOREIGN KEY FK_444F97DD4F8A983C');
        $this->addSql('ALTER TABLE social DROP FOREIGN KEY FK_7161E1874F8A983C');
        $this->addSql('ALTER TABLE mailing_item DROP FOREIGN KEY FK_4E17AEA93931AB76');
        $this->addSql('ALTER TABLE email DROP FOREIGN KEY FK_E7927C74B0265DC7');
        $this->addSql('ALTER TABLE contact_person DROP FOREIGN KEY FK_A44EE6F7B0265DC7');
        $this->addSql('ALTER TABLE phone DROP FOREIGN KEY FK_444F97DDB0265DC7');
        $this->addSql('ALTER TABLE site DROP FOREIGN KEY FK_694309E4B0265DC7');
        $this->addSql('ALTER TABLE social DROP FOREIGN KEY FK_7161E187B0265DC7');
        $this->addSql('ALTER TABLE mailing DROP FOREIGN KEY FK_3ED9315E5DA0FB8');
        $this->addSql('ALTER TABLE email DROP FOREIGN KEY FK_E7927C7419EB6921');
        $this->addSql('ALTER TABLE contact_person DROP FOREIGN KEY FK_A44EE6F719EB6921');
        $this->addSql('ALTER TABLE phone DROP FOREIGN KEY FK_444F97DD19EB6921');
        $this->addSql('ALTER TABLE site DROP FOREIGN KEY FK_694309E419EB6921');
        $this->addSql('ALTER TABLE social DROP FOREIGN KEY FK_7161E18719EB6921');
        $this->addSql('DROP TABLE email');
        $this->addSql('DROP TABLE mailing_item');
        $this->addSql('DROP TABLE contact_person');
        $this->addSql('DROP TABLE mailing');
        $this->addSql('DROP TABLE mail');
        $this->addSql('DROP TABLE contractor');
        $this->addSql('DROP TABLE mail_template');
        $this->addSql('DROP TABLE phone');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE site');
        $this->addSql('DROP TABLE social');
    }
}
