const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async create(username, email, password) {
         // Asegúrate de que los valores están correctamente pasados
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, password]  // Aquí pasas los valores, no las asignaciones
        );
        return  result.insertId; // Devuelve el id del usuario insertado
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async update(userId, data) {
        const {full_name, bio, profile_image_url } = data;
        await db.query(
            'UPDATE users SET full_name = ?, bio = ?, profile_image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [full_name, bio, profile_image_url, userId]
        );
        return 'Información actualizada con éxito'; 
    }

    static async updatePassword(userId, newPassword) {
        await db.query(
            'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [newPassword, userId]
        );
        return 'Contraseña actualizada con éxito';
    }
}

module.exports = User;
