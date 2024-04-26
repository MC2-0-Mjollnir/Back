import { Schema, model } from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - file
 *         - localisation
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the project.
 *         description:
 *           type: string
 *           description: The description of the project.
 *         file:
 *           type: string
 *           description: The file associated with the project.
 *         joinedMembers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user ID of the joined member.
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the member was added.
 *           description: The list of members who joined the project.
 *         plan:
 *           type: string
 *           enum: [basic, professional, entreprise]
 *           default: basic
 *           description: The plan type of the project.
 *         owner:
 *           type: string
 *           description: The user ID of the project owner.
 *         localisation:
 *           type: object
 *           properties:
 *             lat:
 *               type: string
 *               description: The latitude of the project's location.
 *             lng:
 *               type: string
 *               description: The longitude of the project's location.
 *           description: The geographical location of the project.
 *       example:
 *         title: "Example Project"
 *         description: "This is an example project."
 *         file: "example_file.pdf"
 *         joinedMembers: []
 *         plan: "basic"
 *         owner: "user123"
 *         localisation:
 *           lat: "123.456"
 *           lng: "789.012"
 */

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    joinedMembers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    plan: {
        enum: ['basic', 'professional', 'entreprise'],
        type: String,
        default: 'basic'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    localisation: {
        type: {
            lat: String,
            lng: String
        },
        required: true
    }
}, { timestamps: true });

const Project = model('Project', projectSchema);

export default Project;