export = Client;
declare class Client {
  constructor(
    client?: any,
    connection?: {
      host: string;
      port: number;
      password: string;
      user: string;
      database: string;
    },
    table?: string
  );
  conn: {};
  database: any;
  table: any;
  connection(): Promise<void>;
  _postgresExecutionRawQuery(query: any): Promise<any>;
  _mysqlExecutionRawQuery(query: any): Promise<any>;
  _close(): Promise<void>;
  /**
   * Method to run raw query
   *
   * @param {string} query Select * from `users` where `users`.id = 1
   * @returns {Object}
   */
  raw(query: string): any;
  /**
   * Method to delete an value on database
   *
   * DELETE FROM "table_name" WHERE "condition" = "value"
   *
   * @param {string} "table_name"
   * @param {object} { id: 1 }
   * @returns {object}
   */
  delete(table: any, { where }: object): object;
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
  update(table: string, { where, data }: object): Promise<any>;
  /**
   * Method to insert a value on table
   *
   * INSERT INTO "table_name" (`column_name`) VALUES ('data_to_insert')
   *
   * @param {string} table
   * @param {object} data
   * @param {object}
   */
  create(table: string, data: object): Promise<any>;
  /**
   * Method to find all data
   *
   * SELECT * FROM "table_name" or SELECT "column_name" FROM "table_name"
   *
   * @param {string} column
   * @param {string} table
   * @returns {Object}
   */
  findAll(column: string, table: string, include?: boolean): any;
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
  findOne(column: string, table: string, where: object): Promise<any>;
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
  createTable(
    name: any,
    autoIncrement?: boolean,
    fields?: object
  ): Promise<void>;
  dropTable(name: any): Promise<void>;
}
