import { Router } from "express";
import projectsControllers from '../controllers/projectsControllers.js'

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 * /api/v1/projects:
 *   get:
 *     summary: Retrieve all projects
 *     tags: [Projects]
 *     responses:
 *       '200':
 *         description: A list of projects
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Successfully created
 *       '400':
 *         description: Bad request, invalid input
 * /api/v1/projects/joined:
 *   get:
 *     summary: Get projects joined by the current user.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects joined by the current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for the current user.
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Retrieve a single project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single project object
 *   patch:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *       '404':
 *         description: Project not found
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successfully deleted
 *       '404':
 *         description: Project not found
 * /api/v1/projects/join/{id}:
 *   post:
 *     summary: Join a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to join
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully joined
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         file:
 *           type: string
 *         joinedMembers:
 *           type: array
 *           items:
 *             type: string
 *         plan:
 *           type: string
 *         localisation:
 *           type: string
 */

const { getProjects, getJoinedProjects, getSingleProject, joinProject, updateProject, createProject, deleteProject } = projectsControllers

const router = Router();

router.get('/', getProjects);

router.get('/joined', getJoinedProjects);

router.get('/:id', getSingleProject);

router.post('/join/:id', joinProject);

router.post('/', createProject);

router.patch('/:id', updateProject);

router.delete('/:id', deleteProject);

export default router;