import { Config } from "../../types/types";
import { Query } from "../Query/Query";

export class Entity extends Query {
  constructor(options?: Config) {
    super(options)
  }
}