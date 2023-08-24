import { Entity, Table } from './../../';

@Table('users')
export class User extends Entity {
  public name: string;
  public age: number;
}
