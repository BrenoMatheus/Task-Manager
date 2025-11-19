import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// Os valores do ENUM são os mesmos que definimos na entidade:
const TaskPriorityValues = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
const TaskStatusValues = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];

export class CreateTasksTable1763138392038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Certifique-se de que o seu banco de dados suporta o tipo 'enum'.
        // Se estiver usando MySQL, o tipo deve ser 'enum'.
        // Se estiver usando PostgreSQL, o TypeORM normalmente cria o tipo ENUM
        // no banco para você quando você usa 'enum' no type e 'enumName'.
        
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {
                        name: 'id',
                        type: 'serial', // SERIAL para Postgres
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },

                    {
                        name: 'dueDate',
                        type: 'timestamp', // Usamos TIMESTAMP para datas com hora
                        isNullable: true,
                        // Não há default, pois é nullable
                    },
                    {
                        name: 'priority',
                        type: 'enum',
                        enum: TaskPriorityValues, // Valores permitidos para o ENUM
                        default: `'MEDIUM'`, // O valor default DEVE ser uma string entre aspas simples
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: TaskStatusValues, // Valores permitidos para o ENUM
                        default: `'TODO'`, // O valor default DEVE ser uma string entre aspas simples
                        isNullable: false,
                    },
               
                    {
                        name: 'userId',
                        type: 'integer',
                        isNullable: false,
                    },
                    // Campos de auditoria que são boas práticas:
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }
}