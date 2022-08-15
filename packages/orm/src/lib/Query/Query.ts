import { Config } from '../../types/types';
import { Client } from '../Client/Client';
import { CreateConnection } from '../CreateConnetion/CreateConnection';

export class Query extends CreateConnection {
  protected table?: string;

  constructor(options?: Config) {
    super(options)
  }

  async raw<T>(query: string): Promise<T | T[]> {
    const connection = await this.createConnetion();
    const result = await connection.raw(query);
    
    return result
  }

  async findAll<T>(): Promise<T[]> {
    const connection = await this.createConnetion();
    const result = await connection.select("*").from(this.table!)

    return result
  }

  async findOne<T>(where: any): Promise<T> {
    const connection = await this.createConnetion();
    const [result] = await connection.select().from(this.table!).where(where);

    return result
  }
  
  async update<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async delete<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }
}