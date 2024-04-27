import { Router } from "express";
import generateTasks from "../controllers/ganttControllers.js";

/**
 * @swagger
 *  tags:
 *   name: Gantt Tasks
 *   description: AI based endpoints are listed here.
 * /api/v1/gantt/generateTasks:
 *   post:
 *     summary: Generate tasks based on project description.
 *     tags: [Gantt Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tasks generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       start:
 *                         type: string
 *                         format: date-time
 *                       end:
 *                         type: string
 *                         format: date-time
 *                       progress:
 *                         type: string
 *                       dependencies:
 *                         type: string
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */

const router = Router();

router.post("/generateTasks" , generateTasks)

export default router