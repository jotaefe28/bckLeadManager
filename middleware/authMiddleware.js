const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; 
    console.log('token-->1',req.cookies.token);
    console.log('token-->2',req.cookies.authToken);
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado, por favor inicia sesión' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Asigna el userId al request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;

