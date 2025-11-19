import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskCommentsTable1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "task_comments",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, isGenerated: false },
          { name: "taskId", type: "uuid", isNullable: false },
          { name: "userId", type: "uuid", isNullable: false },
          { name: "comment", type: "text", isNullable: false },
          { name: "createdAt", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            columnNames: ["taskId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tasks",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("task_comments");
  }
}
