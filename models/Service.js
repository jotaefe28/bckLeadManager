const db = require('../config/db');

const ServiceModel = {
    create: async (service) => {
        const query = `
            INSERT INTO services (title, specialization_area_id, created_by)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            service.title,
            service.specialization_area_id,
            service.created_by
        ]);
        return result;
    },
    findById: async (id) => {
        const query = `
            SELECT s.*, sa.title AS specialization_area
            FROM services s
            JOIN specialization_areas sa ON s.specialization_area_id = sa.id
            WHERE s.id = ?
        `;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },
    findAll: async () => {
        const query = `
            SELECT s.*, sa.title AS specialization_area
            FROM services s
            JOIN specialization_areas sa ON s.specialization_area_id = sa.id
        `;
        const [rows] = await db.execute(query);
        return rows;
    },
    update: async (id, service) => {
        const query = `
            UPDATE services
            SET title = ?, specialization_area_id = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            service.title,
            service.specialization_area_id,
            id
        ]);
        return result;
    },
    delete: async (id) => {
        const query = `DELETE FROM services WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

module.exports = ServiceModel;
