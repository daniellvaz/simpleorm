import { Config } from "../../types/typer";
import { Knex, knex } from "knex";
import { connection } from "../../knex";
import { Query } from "../Query/Query";

export class CreateConnection {
  
  private database?: Knex<any, unknown[]> 

  constructor(private options?: Config) {}

  protected async createConnetion() {
    if(!this.options){
      return this.database = connection;
    }

    return this.database = knex(this.options);
  }
}