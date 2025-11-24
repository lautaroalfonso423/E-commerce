import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedRole1748522282161 implements MigrationInterface {
    name = 'ModifiedRole1748522282161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "IsAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "IsAdmin"`);
    }

}
