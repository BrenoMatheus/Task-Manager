import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskUsersTable1700000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "task_users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "taskId", type: "uuid", isNullable: false },
          { name: "userId", type: "uuid", isNullable: false },
          { name: "assignedAt", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            columnNames: ["taskId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tasks",
            onDelete: "CASCADE",
          },
        ],
        uniques: [
          {
            name: "UQ_TASK_USER",
            columnNames: ["taskId", "userId"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("task_users");
  }
}
