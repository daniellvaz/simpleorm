import { Config } from "../../types/typer";
import { CreateConnection } from "../CreateConnetion/CreateConnection";
import { Query } from "../Query/Query";

export class Client extends Query {
  constructor(table: string, options?: Config) {
    super(table, options)
  }
}