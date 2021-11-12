const { Router } = require("express");
const database = require("../database/database");
const projects = require("../entities/Projects");
const users = require("../entities/User");

const router = Router();

router
  .get("/", async (req, res) => {
    const response = await users.findAll(null, "users", true);
    res.status(200).json(response);
  })
  .get("/users", async (req, res) => {
    const response = await database.raw("SELECT * FROM users");
    res.status(200).json(response);
  })
  .post("/users", async (req, res) => {
    const response = await database.create("users", {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.send(response);
  })
  .put("/:id", async (req, res) => {
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
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;

    const response = await database.delete("users", {
      where: {
        id,
      },
    });
    res.status(200).json(response);
  });

router
  .get("/projects", async (req, res) => {
    const response = await projects.findAll();

    res.status(200).json(response);
  })
  .post("/projects", async (req, res) => {
    const { description, status, signetedTo } = req.body;

    const response = await projects.create(null, {
      description,
      signeted_to: signetedTo,
      status,
    });

    res.status(201).json(response);
  });

module.exports = router;
