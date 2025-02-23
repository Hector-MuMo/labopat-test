import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { comparePassword, hashPassword } from "../../utils/bcryptHelpers.js";
import users from "../../users.js";

const router = express.Router();

router.post('/register', async (req, res) => {
  const { password, ...args } = req.body;

  //hash password
  const hashedPassword = await hashPassword(password);
  const newUser = { password: hashedPassword, ...args };

  users.push(newUser);
  res.status(201).json({ message: 'User created', newUser })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((us) => us.email === email);

  if (!user) {
    return res.status(400).json({ message: 'User doesnt exist' });
  }

  const isMatchPassword = await comparePassword(password, user.password);

  if (!isMatchPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  //Geterate JWT
  const accessToken = jwt.sign({ email }, config.accessTokenSecret, {
    expiresIn: '15m'
  });

  res.json({ accessToken })

});

export default router;