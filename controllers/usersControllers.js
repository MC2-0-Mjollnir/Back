import AppError from '../utils/AppError.js';
import { compare, genSalt, hash } from 'bcrypt';
import User from '../models/User.js';
import { isValidObjectId } from 'mongoose';

const getUsers = async (req, res, next) => {

    try {
        const users = await User.find({});

        res.status(200).json({ users });
    } catch (error) {
        next(error)
    }
};

const getSingleUser = async (req, res, next) => {
    try {
        const { id: userId } = req.params;

        if (!isValidObjectId(userId)) {
            throw new AppError('Invalid user ID', 401)
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const { firstName, lastName, password } = req.body;

        if (!isValidObjectId(userId)) {
            throw new AppError('Invalid user ID')
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        user.firstName = firstName;
        user.lastName = lastName;

        if (password) {
            const salt = await genSalt(10)
            const hashedPassword = await hash(password, salt);
            user.password = hashedPassword;
        }

        const result = await user.save();

        res.status(200).json({ user: result });
    } catch (error) {
        next(error);
    }
};

const visitProfile = (req, res, next) => {
    try {
        const user = req.session.user;
    
        if (!user) {
            throw new AppError('User not found', 404);
        }
    
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        newUser.password = hashedPassword;

        const savedUser = await newUser.save();

        req.session.user = savedUser;

        res.status(201).json({ user: savedUser });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError('Invalid email or password', 400);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Invalid email or password', 400);
        }

        req.session.user = user;

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id: userId } = req.params;

        if (!isValidObjectId(userId)) {
            throw new AppError('Invalid user ID', 401)
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const logoutUser = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                throw new AppError('Failed to logout', 500);
            }
            res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        next(error)
    }
};

export default {
    getUsers,
    getSingleUser,
    updateUser,
    visitProfile,
    registerUser,
    loginUser,
    deleteUser,
    logoutUser
}