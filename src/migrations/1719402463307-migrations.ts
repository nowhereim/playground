import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719402463307 implements MigrationInterface {
    name = 'Migrations1719402463307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`coupon_entity\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`discountRate\` int NOT NULL, \`expirationDate\` datetime NOT NULL, \`maxIsuueCount\` int NOT NULL, \`issuedQuantity\` int NOT NULL, \`version\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coupon_history_entity\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`couponId\` int NOT NULL, \`userId\` int NOT NULL, \`isUsed\` tinyint NOT NULL, \`usedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`coupon_history_entity\``);
        await queryRunner.query(`DROP TABLE \`coupon_entity\``);
    }

}
