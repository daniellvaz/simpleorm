export interface IParams<r, t> {
  where: r;
  data?: t;
}

export interface IConnection {
  host: string;
  port: number;
  password: string;
  user: string;
  database: string;
}
