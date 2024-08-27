const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header is missing or improperly formatted' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'my_secret_Key'); // Use your secret key
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { authenticate };
