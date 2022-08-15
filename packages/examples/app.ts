import { User } from './src/entities/User';
import express from "express";

const app = express();

app.use(express.json());

interface Customer {
  id: string;
  name: string;
  email: string;
}

app.get("/", async (req, res) => {
  const user = new User();

  const users = await user.findAll();

  return res.status(200).json(users);
})

app.listen(3333, () => console.log("Example is running on port 3333"))