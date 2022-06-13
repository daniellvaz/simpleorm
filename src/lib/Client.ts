const { production } = require("../../../../simpleorm.config.json");
class Client {
  constructor(
    client = null,
    connection = {
      host: null,
      port: null,
      password: null,
      user: null,
      database: null,
    },
    table = null
  ) {
    this.conn = { client, connection } || {};
    this.table = table;
    this.database = null;
  }

  async connection() {
    if (!this.conn.client) {
      this.database = require("../knex");
      return;
    }

    this.database = require("knex")(this.conn);
  }

  async _postgresExecutionRawQuery(query) {
    const result = await this.database.raw(query);

    return result.rows;
  }

  async _mysqlExecutionRawQuery(query) {
    const [rows] = await this.database.raw(query);

    return rows;
  }

  async _oracledbExecutionRawQuery(query) {
    const rows = await this.database.raw(query);

    return rows;
  }

  async _close() {
    await this.database.destroy();
  }

  /**
   * Method to run raw query
   *
   * @param {string} query Select * from `users` where `users`.id = 1
   * @returns {Object}
   */
  async raw(query) {
    await this.connection();

    if (this.conn.client === "postgres" || production.client === "postgres") {
      const result = await this._postgresExecutionRawQuery(query);

      this._close();
      return result;
    }

    if (this.conn.client === "oracledb" || production.client === "oracledb") {
      const result = await this._oracledbExecutionRawQuery(query);

      this._close();
      return result;
    }

    const rows = await this._mysqlExecutionRawQuery(query);

    this._close();
    return rows;
  }

  /**
   * Method to delete an value on database
   *
   * DELETE FROM "table_name" WHERE "condition" = "value"
   *
   * @param {string} "table_name"
   * @param {object} { id: 1 }
   * @returns {object}
   */
  async delete(table, { where }) {
    await this.connection();

    const response = await this.database(!table ? this.table : table)
      .where(where)
      .del();

    this._close();
    return response;
  }

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
  async update(table, { where, data }) {
    await this.connection();

    const response = await this.database(!table ? this.table : table)
      .where(where)
      .update(data);

    this._close();
    return response;
  }

  /**
   * Method to insert a value on table
   *
   * INSERT INTO "table_name" (`column_name`) VALUES ('data_to_insert')
   *
   * @param {string} table
   * @param {object} data
   * @param {object}
   */
  async create(table, data) {
    await this.connection();

    const response = await this.database(!table ? this.table : table).insert(
      data
    );

    if (this.conn.client === "postgres") {
      return response.rows;
    }

    await this._close();

    return response;
  }

  /**
   * Method to find all data
   *
   * SELECT * FROM "table_name" or SELECT "column_name" FROM "table_name"
   *
   * @param {string} column
   * @param {string} table
   * @returns {Object}
   */
  async findAll(column = "*", table, include = false) {
    await this.connection();

    if (include) {
      const response = await this.database
        .select(column)
        .from(!table ? this.table : table);

      return response;
    }

    const response = await this.database
      .select(column)
      .from(!table ? this.table : table);

    return response;
  }

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
  async findOne(column = "*", table, where) {
    await this.connection();

    if (typeof where != "object") {
      throw new Error("Where type must be Object");
    }

    const response = await this.database(!table ? this.table : table)
      .where(where)
      .select(column);

    this._close();
    return response;
  }

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
  async createTable(name, autoIncrement = true, fields = []) {
    await this.connection();

    try {
      await this.database.schema.createTable(name, (table) => {
        if (autoIncrement) table.increments();
        fields.forEach(
          ({ name, type = "string", length = 255, foreignkey }) => {
            switch (type) {
              case "string":
                table.string(name, length);
                break;
              case "integer":
                table.integer(name);
                break;
              case "integer unsigned":
                table.integer(name).unsigned().notNullable();
                break;
              case "float":
                table.float(name);
                break;
              case "decimal":
                table.decimal(name);
                break;
              case "bigInt":
                table.bigInteger(name);
                break;
            }

            if (foreignkey === undefined) {
              return;
            }

            foreignkey.forEach(({ foreign, references, referenciedTable }) => {
              table
                .foreign(foreign)
                .references(references)
                .inTable(referenciedTable);
            });
          }
        );

        table.timestamps(true, true);
      });

      console.log("Table created! 🥳");
    } catch (error) {
      throw new Error("An error ocurred " + error);
    }
  }

  async dropTable(name) {
    await this.connection();

    await this.database.schema.dropTableIfExists(name);
    return;
  }
}

module.exports = { Client };
