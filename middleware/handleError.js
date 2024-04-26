import AppError from "../utils/AppError.js";

const handleError = (error, req, res, next) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message })
    } else {
        res.status(500).json({ message: 'Internal server error!' })
    }
}

export default handleError;