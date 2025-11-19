import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotificationsTable1731681200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "userId", type: "uuid" },
          { name: "taskId", type: "uuid" },
          { name: "type", type: "varchar" },
          { name: "message", type: "text" },
          { name: "read", type: "boolean", default: false },
          { name: "createdAt", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notifications");
  }
}
