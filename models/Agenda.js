const db = require('../config/db');

const AgendaModel = {
    create: async (agenda) => {
        const query = `
            INSERT INTO agendas (name, company, email, phone, service, message)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            agenda.name,
            agenda.company,
            agenda.email,
            agenda.phone,
            agenda.service,
            agenda.message
        ]);
        return result;
    },
    findById: async (id) => {
        const query = `SELECT * FROM agendas WHERE id = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },
    findAll: async () => {
        const query = `SELECT * FROM agendas`;
        const [rows] = await db.execute(query);
        return rows;
    },
    delete: async (id) => {
        const query = `DELETE FROM agendas WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

module.exports = AgendaModel;
