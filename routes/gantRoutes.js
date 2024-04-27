import { Router } from "express";
import generateTasks from "../controllers/gantControllers";


const router = Router();

router.post("/generateTasks" , generateTasks)

export default router