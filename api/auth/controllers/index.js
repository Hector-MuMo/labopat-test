import jwt from "jsonwebtoken";
import * as UsersServices from "../services/index.js"
import { hashPassword, comparePassword } from "../../../utils/bcryptHelpers.js";
import { config } from "../../config/env.js";

const registerUser = async (req, res) => {
  const user = req.body;

  if (!user) {
    return res.status(400).send({ code: "bad-request/missing-info", message: "User information incomplete or empty" })
  }

  const { password, ...args } = user;

  const hashedPassword = await hashPassword(password);
  const newUser = { password: hashedPassword, ...args };

  const result = await UsersServices.createUser(newUser);

  if (result.error) {
    return res.status(404).send({ code: "not-found", message: result.error })
  }

  if (!result) {
    return res.status(500).send({ code: "interal-error/can't register", message: "There was a problem registering the user info. Check backend service." })
  }

  return res.status(201).send({ message: "User create correctly", user: result })
}

const loginUser = async (req, res) => {
  const userCredentials = req.body;

  if (!userCredentials) {
    return res.status(400).send({ code: "bad-request/missing-info", message: "Missing or error on email or password" })
  }

  const user = await UsersServices.findUserByEmail(userCredentials.email);

  if (user.error) {
    return res.status(404).send({ code: "not-found", message: user.error })
  }

  if (!user) {
    return res.status(500).send({ code: "interal-error/can't register", message: "There was a problem registering the user info. Check backend service." })
  }

  const isMatchPassword = await comparePassword(userCredentials.password, user.password);

  if (!isMatchPassword) {
    return res.status(400).send({ code: "bad-request", message: "Invalid password " });
  }

  const accessToken = jwt.sign({ email: userCredentials.email }, config.accessTokenSecret, {
    expiresIn: '15m'
  });

  return res.status(200).send({ accessToken })
}

export {
  registerUser,
  loginUser
}