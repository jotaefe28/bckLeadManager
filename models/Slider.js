const db = require('../config/db');

const SliderModel = {
    
    async create(sliderData) {
        const query = `
            INSERT INTO slider (image_url, title, description, redirect_link, is_active, created_by)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            sliderData.image_url,
            sliderData.title,
            sliderData.description,
            sliderData.redirect_link,
            sliderData.is_active,
            sliderData.created_by
        ]);
        return result.insertId;
    },

    async findAll() {
        const query = `SELECT * FROM slider`;
        const [rows] = await db.execute(query);
        return rows;
    },

    async findById(id) {
        const query = `SELECT * FROM slider WHERE id = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    async update(id, sliderData) {
        const query = `
            UPDATE slider
            SET image_url = ?, title = ?, description = ?, redirect_link = ?, is_active = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            sliderData.image_url,
            sliderData.title,
            sliderData.description,
            sliderData.redirect_link,
            sliderData.is_active,
            id
        ]);
        return result.affectedRows > 0;
    },

    async delete(id) {
        const query = `DELETE FROM slider WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    },

    async toggleActiveStatus(id, isActive) {
        const query = `UPDATE slider SET is_active = ? WHERE id = ?`;
        const [result] = await db.execute(query, [isActive, id]);
        return result.affectedRows > 0;
    }
};

module.exports = SliderModel;