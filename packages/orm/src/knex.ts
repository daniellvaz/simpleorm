import { knex } from 'knex' 

export const connection = knex({
  client: process.env.SIMPLE_CLIENT,
  connection: {
    host: process.env.SIMPLE_HOST,
    user: process.env.SIMPLE_USER,
    password: process.env.SIMPLE_PASSWORD,
    database: process.env.SIMPLE_DATABASE,
  }
});