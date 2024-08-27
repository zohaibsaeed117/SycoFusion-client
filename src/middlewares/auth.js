const jwt = require('jsonwebtoken');
require('dotenv').config()
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: 'Invalid Bearer' })
    }
    let token = authHeader.split(' ')[1];
    if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
        const { id, username } = decoded
        req.user = { id, username }
    } catch (err) {
        return res.status(401).json({ message: "Not authorized to access this route" })
    }
    next();
}

module.exports = authentication;