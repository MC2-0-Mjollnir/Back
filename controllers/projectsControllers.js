import { isValidObjectId } from "mongoose";
import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";

const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({}).populate('joinedMembers.user', 'firstName lastName email');

        res.status(200).json({ projects });
    } catch (error) {
        next(error)
    }
}

const getJoinedProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({
            joinedMembers: {
                user: req.session.user._id
            }
        })

        res.status(200).json({ projects });
    } catch (error) {
        next(error)
    }
}

const getSingleProject = async (req, res, next) => {
    try {
        const { id: projectId } = req.params;

        if (!isValidObjectId(projectId)) {
            throw new AppError('Invalid project ID')
        }

        const project = await Project.findById(projectId).populate('joinedMembers.user', 'firstName lastName email');

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
};

const joinProject = async (req, res, next) => {
    try {
        const { id: projectId } = req.params;

        if (!isValidObjectId(projectId)) {
            throw new AppError('Invalid project ID', 401)
        }

        const project = await Project.findById(projectId).populate('joinedMembers.user', 'firstName lastName email');

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        if (project.owner === req.session.user._id) {
            throw new AppError("Project owner can't join his own project", 404)
        }

        project.joinedMembers.push(req.session.user._id);

        const result = await project.save();

        res.status(200).json({ project: result });
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const { id: projectId } = req.params;
        const { title, description, file, joinedMembers, plan, localisation } = req.body;

        if (!isValidObjectId(projectId)) {
            throw new AppError('Invalid project ID', 401)
        }

        const project = await Project.findById(projectId).populate('joinedMembers.user', 'firstName lastName email');

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        if (project.owner !== req.session.user._id) {
            throw new AppError('Only project owner have the right to delete his project', 404)
        }

        project.title = title;
        project.description = description;
        project.file = file;
        project.joinedMembers = joinedMembers;
        project.plan = plan;
        project.localisation = localisation;

        const result = await project.save();

        res.status(200).json({ project: result });
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        const { title, description, file, joinedMembers, plan, localisation } = req.body;

        const newProject = new Project({
            title,
            description,
            file,
            joinedMembers,
            plan,
            owner: req.session.user._id,
            localisation
        });

        const savedProject = await (await newProject.save()).populate('joinedMembers.user', 'firstName lastName email');

        res.status(201).json({ project: savedProject });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const { id: projectId } = req.params;

        if (!isValidObjectId(projectId)) {
            throw new AppError('Invalid project ID')
        }

        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        res.status(204).json({ message: 'Project deleted successfully' });
    } catch (error) {
        next(error);
    }
};


export default {
    getProjects,
    getSingleProject,
    getJoinedProjects,
    joinProject,
    updateProject,
    createProject,
    deleteProject
}