const db = require('../config/db');

const SpecializationAreaModel = {
    create: async (area) => {
        const query = `
            INSERT INTO specialization_areas (title, created_by)
            VALUES (?, ?)
        `;
        const [result] = await db.execute(query, [area.title, area.created_by]);
        return result;
    },
    findById: async (id) => {
        const query = `SELECT * FROM specialization_areas WHERE id = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },
    findAll: async () => {
        const query = `SELECT * FROM specialization_areas`;
        const [rows] = await db.execute(query);
        return rows;
    },
    update: async (id, area) => {
        const query = `
            UPDATE specialization_areas
            SET title = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [area.title, id]);
        return result;
    },
    delete: async (id) => {
        const query = `DELETE FROM specialization_areas WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

module.exports = SpecializationAreaModel;
