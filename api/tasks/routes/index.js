import express from "express";
import { authenticateToken } from "../../middleware/middleware.js";
import { saveTask, getUserTasks, deleteUserTasks, updateUserTasks } from "../controllers/index.js"

const router = express.Router();

router.get('/tasks', authenticateToken, getUserTasks);
router.post('/tasks', authenticateToken, saveTask);
router.delete('/tasks/:id', authenticateToken, deleteUserTasks);
router.put('/tasks/:id', authenticateToken, updateUserTasks);

export default router;