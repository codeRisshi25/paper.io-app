import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = (req, res, next) => {
    let token = req.cookies.token || null;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    if (typeof token !== 'string') {
        return res.status(401).json({ message: 'Invalid token format' });
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        res.status(401).json({ message: 'Invalid access token' });
    }
};

export default authMiddleware;