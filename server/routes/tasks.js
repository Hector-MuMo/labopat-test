import express from "express";
import { authenticateToken } from "../../middleware/middleware.js";

const router = express.Router();

// Mock data: list of users

const tasks = [
  {
    id: '1', email: "juanperez@gmail.com", tasks: [
      { taskId: '1', title: 'Pet the pet', description: 'Dont forget to give attention to your pet, he deserves it.', isComplete: false, },
      { taskId: '2', title: 'Implement an api', description: 'create a api restful with node js.', isComplete: false, },
    ]
  },
  {
    id: '2', email: "pedrojuarez@gmail.com", tasks: [
      { taskId: '1', title: 'Organize the Tool room', description: 'Dont forget to order the tools and screws.', isComplete: false, },
      { taskId: '2', title: 'Send CV', description: 'Give a try and send so many CV as you can today.', isComplete: false, },
    ]
  },
]

router.get('/tasks', authenticateToken, (req, res) => {

  const userTasks = tasks.filter(task => task.email === req.user.email)

  if (userTasks && userTasks[0].tasks) {
    res.json({ userTasks: userTasks[0].tasks })
  }

  res.status(400).json({ message: 'Cant obtain user tasks' })
});

export default router;