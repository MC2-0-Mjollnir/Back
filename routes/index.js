import { Router } from "express";
import usersRouters from "./usersRoutes.js";

const router = Router();

router.use('/users', usersRouters)

export default router;