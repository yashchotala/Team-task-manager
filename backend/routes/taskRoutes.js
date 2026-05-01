import express from 'express';
import { authMiddleware, authorize } from '../middleware/auth.js';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../controllers/taskController.js';

const router = express.Router();
router.post('/', authMiddleware, authorize(['admin']), createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTaskStatus);
router.delete('/:id', authMiddleware, authorize(['admin']), deleteTask);
export default router;