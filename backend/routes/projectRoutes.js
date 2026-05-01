import express from 'express';
import { authMiddleware, authorize } from '../middleware/auth.js';
import { createProject, getProjects, addMember, deleteProject } from '../controllers/projectController.js';

const router = express.Router();
router.post('/', authMiddleware, authorize(['admin']), createProject);
router.get('/', authMiddleware, getProjects);
router.put('/:id/add-member', authMiddleware, authorize(['admin']), addMember);
router.delete('/:id', authMiddleware, authorize(['admin']), deleteProject);
export default router;