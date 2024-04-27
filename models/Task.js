import { Schema, model } from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - start
 *         - end
 *         - progress
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the task
 *         start:
 *           type: string
 *           format: date-time
 *           description: The start date of the task
 *         end:
 *           type: string
 *           format: date-time
 *           description: The end date of the task
 *         progress:
 *           type: number
 *           description: The progress of the task (0-100)
 *         dependency:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of tasks that this task depends on
 */

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    },
    dependency: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
}, { timestamps: true });

const Task = model('Task', taskSchema);

export default Task;