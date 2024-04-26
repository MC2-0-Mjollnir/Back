import { Schema, model } from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user. It should be unique.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@example.com
 *         password: mypassword123
 */

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = model('User', userSchema);

export default User;