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

## simpleorm.config.json

```json
{
  "production": {
    "client": "mysql",
    "connection": {
      "host": "127.0.0.1",
      "port": 3306,
      "user": "root",
      "password": "my_password",
      "database": "my_database"
    },
    "migrantions": "./path/to/your/migrantions"
  }
}
```

<br>

## index.js

```javascript
const { Client } = require("siimpleorm");

const database = new Client();

module.exports = database;
```

<br>

## ExampleController.js

```javascript
const client = require("./path/to/client");

module.exports = {
  async index(request, response) {
    try {
      const row = await client.findAll(null, "my_table"); //first parameter null default "*"

      return res.status(200).json(row);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
};
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
