import AppError from "../utils/AppError.js";

const handleError = (error, req, res, next) => {
    res.status((error instanceof AppError) ? error.statusCode : 500).json({ message: error.message })
}

export default handleError;