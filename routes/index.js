import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import projectsRouters from "./projectsRoutes.js";

const router = Router();

router.use('/users', usersRouters);
router.use('/projects', projectsRouters);

export default router;