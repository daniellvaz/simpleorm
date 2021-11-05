const { Router } = require("express");
const database = require("../database/database");

const router = Router();

router.get("/", async (req, res) => {
  const response = await database.findAll(null, "users", true);
  res.status(200).json(response);
});

router.get("/users", async (req, res) => {
  const response = await database.raw("SELECT * FROM users");
  res.status(200).json(response);
});

router.post("/users", async (req, res) => {
  const response = await database.create("users", {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.send(response);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await database.update("users", {
    where: {
      id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });
  res.status(200).json(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await database.delete("users", {
    where: {
      id,
    },
  });
  res.status(200).json(response);
});

module.exports = router;
