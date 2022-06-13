import { Config } from "../../types/typer";

export class CreateConnetion {
  constructor(private connection: Config){}

  async createConnetion() {
    this.connection.client
  }
}