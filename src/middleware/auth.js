const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        
        if (!decoded.user_id) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth; 