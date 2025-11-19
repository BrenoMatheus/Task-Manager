import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskHistoryTable1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "task_history",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "taskId", type: "uuid", isNullable: false },
          { name: "userId", type: "uuid", isNullable: true },
          { name: "field", type: "varchar", isNullable: false },
          { name: "oldValue", type: "text", isNullable: true },
          { name: "newValue", type: "text", isNullable: true },
          { name: "changedAt", type: "timestamp", default: "now()" },
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
    await queryRunner.dropTable("task_history");
  }
}
