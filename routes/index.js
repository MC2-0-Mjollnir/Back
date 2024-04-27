import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import projectsRouters from "./projectsRoutes.js";
import ganttRoutes from "./ganttRoutes.js"

const router = Router();

router.use('/users', usersRouters);
router.use('/gantt', ganttRoutes);
router.use('/projects', projectsRouters);

export default router;