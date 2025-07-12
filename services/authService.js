const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class AuthService {
    static async register(username, email, password) {
        const userExists = await User.findByEmail(email);
        const usernameExists = await User.findByUsername(username);
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!password) throw new Error('Password es requerido');
        if (userExists) throw new Error('El correo ya está registrado.');
        if (usernameExists) throw new Error('El nombre de usuario ya está en uso.');
        const newUser = await User.create(
            username,
            email,
            hashedPassword
        );
        return newUser; 
   
    }

    static async login(email, password) {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('Usuario no encontrado.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Contraseña incorrecta.');

        
        return user;
    }

    static async updateUser(userId, data) {
        const result = await User.update(userId, data);
        return result;
    }

    static async resetPassword(email, newPassword) {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('Usuario no encontrado.');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(user.id, hashedPassword);
        return 'Contraseña actualizada con éxito';
    }
}

module.exports = AuthService;
