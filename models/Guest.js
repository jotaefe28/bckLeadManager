const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const GuestModel = {
    create: async (guest) => {
        try {
            console.log('guest', guest);

            const query = `
                INSERT INTO guest (id, name, comment, adult, child, assistant)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const id = uuidv4();
            const [result] = await db.execute(query, [
                id,
                guest.name,
                guest.comment,
                guest.adult,
                guest.child,
                guest.assistant
            ]);

            return result;
        } catch (error) {
            console.error('Error al crear guest:', error.message);
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const query = `SELECT * FROM guest WHERE id = ?`;
            const [rows] = await db.execute(query, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error al buscar guest por ID:', error.message);
            throw error;
        }
    },

    findAll: async () => {
        try {
            const query = `SELECT * FROM guest`;
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener todos los guests:', error.message);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const query = `DELETE FROM guest WHERE id = ?`;
            const [result] = await db.execute(query, [id]);
            return result;
        } catch (error) {
            console.error('Error al eliminar guest:', error.message);
            throw error;
        }
    }
};

module.exports = GuestModel;
