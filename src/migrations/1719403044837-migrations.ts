import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719403044837 implements MigrationInterface {
    name = 'Migrations1719403044837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupon_history_entity\` CHANGE \`isUsed\` \`isUsed\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`coupon_history_entity\` CHANGE \`usedAt\` \`usedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupon_history_entity\` CHANGE \`usedAt\` \`usedAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupon_history_entity\` CHANGE \`isUsed\` \`isUsed\` tinyint NOT NULL`);
    }

}
