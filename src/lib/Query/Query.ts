import { Config } from '../../types/typer';
import { CreateConnection } from '../CreateConnetion/CreateConnection';

export class Query extends CreateConnection {

  constructor(private table: string, options?: Config) {
    super(options)
  }

  async raw<T>(query: string): Promise<any> {
    const connection = await this.createConnetion();
    const result = await connection.raw<T>(query);
    
    return result
  }

  async findAll<T>(): Promise<any> {
    const connection = await this.createConnetion();
    const result = await connection.select()

    return result
  }

  async findOne<T>({ where }: { where: string }): Promise<any> {
    const connection = await this.createConnetion();
    const result = await connection.select().where(where)

    return result
  }
  update<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  
}