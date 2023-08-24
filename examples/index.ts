import 'dotenv/config';
import { User } from './Entity/User';

interface IUser {
  id?: number;
  name: string;
  age: number;
}

const user = new User();

async function find() {
  const users = await user.findAll<IUser[]>();

  console.log(users);
}

async function create() {
  const response = await user.create<IUser>({
    name: 'Janaina Everli Vaz',
    age: 27,
  });

  console.log(response.id);
}

async function update() {
  const response = await user.update<IUser>(6, {
    name: 'Janaina Everli Ferreira Vaz',
    age: 27,
  });

  console.log(response.id);
}

async function drop() {
  const response = await user.delete(6);

  console.log(response);
}

async function raw() {
  const response = await user.raw<IUser[]>`
    select * from users
  `;

  console.log(response);
}

raw()
  .then()
  .catch((e) => console.log(e));
