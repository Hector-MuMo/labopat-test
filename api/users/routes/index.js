import express from "express";
import { authenticateToken } from "../../middleware/middleware.js";
import { findUserById, updateUserById, deleteUserById } from "../controllers/index.js"

const router = express.Router();

router.get('/users/:id', authenticateToken, findUserById);
router.put('/users/:id', authenticateToken, updateUserById);
router.delete('/users/:id', authenticateToken, deleteUserById);

export default router;