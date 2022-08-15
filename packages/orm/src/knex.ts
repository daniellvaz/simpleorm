import { knex } from 'knex' 
import { production } from"./knexfile";

export const connection = knex(production);