interface Connection {

}

export interface Config {
  client: "mysql" | "oracledb" | "postgres" | "sqlite",
  connection: Connection
}