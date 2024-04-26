import { Router } from "express";
import projectsControllers from '../controllers/projectsControllers.js'

const { getProjects, getSingleProject, joinProject, updateProject, createProject, deleteProject } = projectsControllers

const router = Router();

router.get('/', getProjects);

router.get('/:id', getSingleProject);

router.post('/join/:id', joinProject);

router.post('/', createProject);

router.patch('/:id', updateProject);

router.delete('/:id', deleteProject);

export default router;