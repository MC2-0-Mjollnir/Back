import { Router } from "express";
import usersControllers from '../controllers/usersControllers.js'
import verifyAuth from "../middleware/verifyAuth.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid email or password.
 * /api/v1/users/register:
 *   post:
 *     summary: Register a user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The registered user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid email.
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout the current user.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Registered successfully.
 *       500:
 *         description: Failed to logout.
 * /api/v1/users:
 *   get:
 *     summary: Get all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found.
 *   post:
 *     summary: Register a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The newly registered user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists or invalid request body.
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get a single user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *   put:
 *     summary: Update a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 * /api/v1/users/profile:
 *   get:
 *     summary: Get the current user's profile.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The current user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */

const { getUsers, getSingleUser, updateUser, visitProfile, registerUser, loginUser, logoutUser, deleteUser } = usersControllers

const router = Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.use(verifyAuth)

router.get('/', getUsers);

router.get('/profile', visitProfile);

router.get('/:id', getSingleUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/logout', logoutUser);

export default router;