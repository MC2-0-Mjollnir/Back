import AppError from '../utils/AppError.js';
import { isValidObjectId } from 'mongoose';
import Task from '../models/Task.js';

const getTasks = async (req, res, next) => {

    try {
        const tasks = await Task.find({});

        res.status(200).json({ tasks });
    } catch (error) {
        next(error)
    }
};

const getSingleTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;

        if (!isValidObjectId(taskId)) {
            throw new AppError('Invalid task ID', 401)
        }

        const task = await Task.findById(taskId);

        if (!task) {
            throw new AppError('task not found', 404);
        }

        res.status(200).json({ task });
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        const { name, start, end, dependency, progress } = req.body;

        const newTask = new Task({
            name,
            start,
            end,
            dependency,
            progress
        });

        const savedTask = await (await newTask.save()).populate('dependency', 'name start end');

        res.status(201).json({ project: savedTask });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { name, start, end, dependency, progress } = req.body;

        if (!isValidObjectId(taskId)) {
            throw new AppError('Invalid task ID')
        }

        const task = await Task.findById(taskId).populate('dependency', 'name start end');

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        task.start = start;
        task.end = end;
        task.dependency = dependency;
        task.progress = progress;

        const result = await (await task.save()).populate('dependency', 'name start end');

        res.status(200).json({ task: result });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;

        if (!isValidObjectId(taskId)) {
            throw new AppError('Invalid task ID', 401)
        }

        const user = await Task.findByIdAndDelete(taskId).populate('dependency', 'name start end');

        if (!user) {
            throw new AppError('Task not found', 404);
        }

        res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default {
    getTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}