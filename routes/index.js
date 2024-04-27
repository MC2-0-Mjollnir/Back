import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import projectsRouters from "./projectsRoutes.js";
import gantRoutes from "./gantRoutes.js"

const router = Router();

router.use('/users', usersRouters);
router.use('/projects', projectsRouters);
router.use('/gantt', gantRoutes);

export default router;