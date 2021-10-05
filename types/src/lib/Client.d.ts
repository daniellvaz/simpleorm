import { Knex } from "knex";
import { ICondition } from "./types/ICondition";
import { IParams } from "./types/IParams";
import { ITableField } from "./types/ITableField";

export = Client;
declare class Client {
  database: Knex;

  raw<t>(query: string): Promise<t[]>;
  /**
   * Method to delete an value on database
   *
   * DELETE FROM "table_name" WHERE "condition" = "value"
   *
   * @param {string} table
   * @param {object} { where }
   * @returns {object}
   */
  delete<r, t>(table: string, { where }: IParams<r, t>): Promise<void>;

  /**
   * Method to update a value on table
   *
   * UPDATE "table_name" SET "user_name" = "user name" WHERE "id" = 1
   *
   * @param {string} table "users"
   * @param {object} condition { id: 1 } // output: WHERE id = 1
   * @param {object} fields { name: "user name", age: 29, email: "user@email.com" } // outputs SET name = "user name"
   * @param {object} data { name: "user name", age: 29, email: "user@email.com" } // outputs SET name = "user name"
   */
  update<r, t>(table: string, { where, data }: IParams<r, t>): Promise<t>;

  /**
   * Method to insert a value on table
   *
   * INSERT INTO "table_name" (`column_name`) VALUES ('data_to_insert')
   *
   * @param {string} table
   * @param {object} data
   * @param {object}
   */
  create<t>(table: string, data: t): Promise<t[]>;

  /**
   * Method to find all data
   *
   * SELECT * FROM "table_name" or SELECT "column_name" FROM "table_name"
   *
   * @param {string} column
   * @param {string} table
   * @returns {Object}
   */
  findAll<t>(
    column: string | null,
    table: string,
    include?: boolean
  ): Promise<t[]>;

  /**
   * * Method to find all data
   *
   * SELECT * FROM "table_name" WHERE "condition" = "value"
   *
   * or
   *
   * SELECT "column_name" FROM "table_name" WHERE "condition" = "value"
   *
   * @param {string} column
   * @param {string} table
   * @param {object} where
   * @returns {Promise}
   */
  findOne<t>(
    column: string | null,
    table: string,
    where: t
  ): Promise<t[] | undefined>;

  /**
   * Method to create a table
   *
   * AutoIncrement default is true to generate a primary key id
   *
   * @param {sting} name Table name
   * @param {boolean} autoIncrement default true
   * @param {object} fields [
   *  {
   *    name: "colum_name",
   *    type: "string",
   *    length: 255,
   *    foreignkey: [
   *      {
   *        foreign: "user_id",
   *        references: "profile.user_id"
   *      }
   *    ]
   *  }
   * ]
   */
  createTable<t>(
    name: any,
    autoIncrement?: boolean,
    fields?: ITableField
  ): Promise<t[] | undefined> {}

  /**
   *  Method to delete an table
   * @param {string} name
   */
  dropTable(name: string): Promise<void>;
}
