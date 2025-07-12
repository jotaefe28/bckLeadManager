const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');
// Genera un token de acceso y un token de refresh
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password es requerido' });
        }

        const newUser = await AuthService.register(username, email, password);
        const tokens = generateTokens(newUser);

        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000 // 15 minutos
        });
        res.cookie("token", token, {
            httpOnly: true, // Protege contra XSS
            secure: false,  // Cambia a `true` cuando uses HTTPS (en producción)
            sameSite: "Lax", // Permite solicitudes cruzadas en formularios
            maxAge: 24 * 60 * 60 * 1000, // 1 día en milisegundos
          });

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

        // Incluye los datos del usuario y el token en la respuesta
        res.status(201).json({ 
            message: 'Usuario registrado con éxito', 
            user: {
                id: newUser,
                username: username,
                email: email
            },
            token: tokens.accessToken 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Endpoint para refrescar el token de acceso
exports.refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: 'No autorizado' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: 'Token actualizado' });
    } catch (error) {
        res.status(403).json({ message: 'Token de refresco inválido o expirado' });
    }
};
exports.register2 = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = await AuthService.register(username, email, password);

        // Generamos el token JWT para el nuevo usuario
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Configuramos la cookie con el token, segura y solo accesible por HTTP
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo en producción
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
        });

        // Enviamos una respuesta indicando que el registro fue exitoso
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const dataUser = {
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            bio: user.bio,
            profile_image: user.profile_image
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.json({ message: 'Inicio de sesión exitoso', user:dataUser, token:token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await AuthService.updateUser(userId, req.body);
        res.json({message:result});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const message = await AuthService.resetPassword(email, newPassword);
        res.json({ message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({ message: 'Cierre de sesión exitoso!' });
};
