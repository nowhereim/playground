import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719592559136 implements MigrationInterface {
    name = 'Migrations1719592559136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`domain_event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`occurredAt\` datetime NOT NULL, \`data\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`domain_event\``);
    }

}
