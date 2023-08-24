<h1 align="center">
  <img src="assets/logo.png">
</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/Codesandbox-000000?style=for-the-badge&logo=CodeSandbox&logoColor=white" />
  </a>
  <a href="https://twitter.com/daniellmurilo" target="_blank">
    <img alt="Twitter: daniellmurilo" src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"/>
  </a>
  <a href="https://twitter.com/daniellmurilo" target="_blank">
    <img alt="Twitter: daniellmurilo" src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" />
  </a>
</p>

<br>

> An simple object relational mapper project.

<hr>
<br>

## Install

```sh
yarn add siimpleorm
```

### or

<br>

```sh
npm install siimpleorm
```

<br>

### or

<br>

```sh
pnpm install siimpleorm
```

<br>

## simpleorm.config.json

```env
  SIMPLE_CLIENT="mysql"
  SIMPLE_HOST="localhost"
  SIMPLE_USER="root"
  SIMPLE_PASSWORD=123456
  SIMPLE_DATABASE="example"
```

## Example Entity

```typescript
@Table('users')
export default class User extends Entity {
  public id?: string;
  public name: string;
  public age: string;
}
```

## Example Controller

```typescript
const controller = {
  async index(request, response) {
    try {
      const row = await client.findAll();

      return res.status(200).json(row);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
};

export default controller;
```

<br>

## Author

👤 **Daniel Murilo Vaz**

- Website: https://www.daniellvaz.com.br
- Twitter: [@daniellmurilo](https://twitter.com/daniellmurilo)
- Github: [@daniellvaz](https://github.com/daniellvaz)
- LinkedIn: [@daniellvaz](https://linkedin.com/in/daniellvaz)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/daniellvaz/simpleorm/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
