import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = Router();
router.use(verifyAuth)

router.use('/users', usersRouters)

export default router;