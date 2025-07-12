const db = require('../config/db');

class Category {
    static async create({ title, created_by }) {
        const [result] = await db.query(
            'INSERT INTO categories (title, created_by) VALUES (?, ?)',
            [title, created_by]
        );
        return { id: result.insertId, title, created_by };
    }

    static async update(id, { title }, userId) {
        const [result] = await db.query(
            'UPDATE categories SET title = ? WHERE id = ? AND created_by = ?',
            [title, id, userId]
        );
        return result.affectedRows > 0;
    }

    static async delete(id, userId) {
        const [result] = await db.query('DELETE FROM categories WHERE id = ? AND created_by = ?', [id, userId]);
        return result.affectedRows > 0;
    }

    static async findAll() {
        const [categories] = await db.query('SELECT * FROM categories');
        return categories;
    }
}

module.exports = Category;
