import AppError from "../utils/AppError.js";

function verifyAuth(req, res, next) {
    try {
        if (!(req.session && req.session.user)) {
            throw new AppError('Unauthorized', 401);
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default verifyAuth;