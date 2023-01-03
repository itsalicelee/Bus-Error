import jwt from 'jsonwebtoken';

exports.validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            valid: true,
            userId: decoded.id,
        };
    } catch (err) {
        return {
            valid: false,
            message: err.message,
        };
    }
}