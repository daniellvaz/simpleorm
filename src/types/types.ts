interface Connection {
  host?: string;
  user?: string;
  password?: string;
  port?: number;
  database?: string;
  connectionString?: string;
}

export interface Config {
  client: 'mysql' | 'oracledb' | 'postgres' | 'sqlite';
  connection: Connection;
}
