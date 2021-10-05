class Client {
  database = require("../knex");

  async raw(query) {
    const response = await this.database.raw(query);
    return response[0];
  }

  /**
   * Method to delete an value on database
   *
   * DELETE FROM "table_name" WHERE "condition" = "value"
   *
   * @param {string} table
   * @param {object} { where }
   * @returns {object}
   */
  async delete(table, { where }) {
    const response = await this.database(table).where(where).del();
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
    const response = await this.database(table).where(where).update(data);
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
    const response = await this.database(table).insert(data);
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
    if (include) {
      const response = await this.database.select(column).from(table);

      return response;
    }

    const response = await this.database.select(column).from(table);
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
    if (typeof where != "object") {
      throw new Error("Where type must be Object");
    }

    const response = await this.database(table).where(where).select(column);

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
    await this.database.schema.dropTableIfExists(name);
    return;
  }
}

module.exports = Client;
