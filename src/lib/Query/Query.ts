import { connection } from './../../knex';
import { Config } from '../../types/types';
import { CreateConnection } from '../CreateConnetion/CreateConnection';

export class Query extends CreateConnection {
  protected table?: string;

  constructor(options?: Config) {
    super(options);
  }

  async raw<T = unknown>(query: TemplateStringsArray): Promise<T | T[]> {
    const connection = await this.createConnetion();
    const [result] = await connection.raw(`
      ${query}
    `);

    return result;
  }

  async findAll<T = unknown>(): Promise<T[]> {
    const connection = await this.createConnetion();
    const result = await connection.select('*').from(this.table!);

    return result;
  }

  async findOne<T = unknown>(id: string | number): Promise<T> {
    const connection = await this.createConnetion();
    const [result] = await connection.select().from(this.table!).where({ id });

    return result;
  }

  async create<T = unknown, R = unknown>(data: R): Promise<T> {
    const connection = await this.createConnetion();

    await connection.insert(data).from(this.table!);

    const [item] = await connection
      .select()
      .from(this.table!)
      .orderBy('id', 'desc')
      .limit(1);
    return item;
  }

  async update<T = unknown>(id: number | string, data: T): Promise<T> {
    const connection = await this.createConnetion();

    await connection.update(data).from(this.table!).where({ id });

    const [result] = await connection
      .select()
      .from(this.table!)
      .orderBy('id', 'desc')
      .limit(1);
    return result;
  }

  async delete(id: number | string): Promise<boolean> {
    const connection = await this.createConnetion();
    const status = await connection.delete().from(this.table!).where({ id });

    if (status > 0) {
      return true;
    }

    return false;
  }
}
