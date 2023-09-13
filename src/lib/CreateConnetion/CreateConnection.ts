import { Knex, knex } from 'knex';
import { connection } from '../../knex';
import { Config } from '../../types/types';

export class CreateConnection {
  private database?: Knex<any, unknown[]>;

  constructor(private options?: Config) {}

  protected async createConnetion() {
    if (!this.options) {
      return (this.database = connection);
    }

    return (this.database = knex(this.options));
  }
}
