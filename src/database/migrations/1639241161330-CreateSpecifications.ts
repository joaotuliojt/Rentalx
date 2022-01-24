import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecifications1639241161330 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const table = new Table({
      name: "specifications",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
        },
        {
          name: "name",
          type: "varchar"
        },
        {
          name: "description",
          type: "varchar"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ]
    })

    await queryRunner.createTable(table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("specifications")
  }

}
