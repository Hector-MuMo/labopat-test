import express from "express";
import { hashPassword } from "../../utils/bcryptHelpers.js";
import { authenticateToken } from "../../middleware/middleware.js";

const router = express.Router();

// Mock data: list of users

let users = [
  // { id: '1', name: 'Juan', lastname: 'perez', email: 'juanperez@gmail.com', password: 'testeojuan', tasksId: 'juanTasks123' },
  // { id: '2', name: 'Pedro', lastname: 'juarez', email: 'pedrojuarez@gmail.com', password: 'testeopedro', tasksId: 'pedroTasks123' }
]

router.get('/users', authenticateToken, (req, res) => {
  res.json({ users })
});

// router.post('/users', async (req, res) => {
//   const { password, ...args } = req.body;

//   //hash password
//   const hashedPassword = await hashPassword(password);
//   const newUser = { password: hashedPassword, ...args };
//   users.push(newUser);
//   res.status(201).json({ message: 'User created', newUser })
// })

export default router;