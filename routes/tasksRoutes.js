import { Router } from "express";
import tasksControllers from '../controllers/tasksControllers.js'

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for managing tasks
 * /api/v1/tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: A list of tasks
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Successfully created
 *       '400':
 *         description: Bad request, invalid input
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single task object
 *       '404':
 *         description: Task not found
 *   patch:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *       '404':
 *         description: Task not found
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successfully deleted
 *       '404':
 *         description: Task not found
 */

const { getTasks, getSingleTask, createTask, updateTask, deleteTask } = tasksControllers

const router = Router();

router.get('/', getTasks);

router.get('/:id', getSingleTask);

router.post('/', createTask);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;