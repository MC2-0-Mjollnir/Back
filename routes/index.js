import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import projectsRouters from "./projectsRoutes.js";
import ganttRoutes from "./ganttRoutes.js"
import tasksRoutes from "./tasksRoutes.js"

const router = Router();

router.use('/users', usersRouters);
router.use('/gantt', ganttRoutes);
router.use('/projects', projectsRouters);
router.use('/tasks', tasksRoutes);

export default router;