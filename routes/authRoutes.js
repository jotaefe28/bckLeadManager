const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 35, // Máximo 5 intentos por IP cada 15 minutos
    message: 'Demasiados intentos de inicio de sesión. Inténtalo de nuevo después de 15 minutos.'
});

router.post('/login', loginLimiter, authController.login);
router.post('/register', loginLimiter,authController.register);
router.post('/reset-password', authController.resetPassword);
router.put('/update', authMiddleware, authController.updateUser);
router.post('/logout', authController.logout);
router.get("/test", (req, res) => res.send("vercerl routes"));
// Ruta protegida, solo accesible con token válido
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Perfil del usuario', userId: req.userId });
});
module.exports = router;
