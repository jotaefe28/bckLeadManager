const db = require('../config/db');

class Post {
    static async create({ title, short_description, content, category_id, created_by }) {
        const [result] = await db.query(
            'INSERT INTO posts (title, short_description, content, category_id, created_by) VALUES (?, ?, ?, ?, ?)',
            [title, short_description, content, category_id, created_by]
        );
        return { id: result.insertId, title, short_description, content, category_id, created_by };
    }

    static async update(id, { title, short_description, content, category_id }, userId) {
        const [result] = await db.query(
            'UPDATE posts SET title = ?, short_description = ?, content = ?, category_id = ? WHERE id = ? AND created_by = ?',
            [title, short_description, content, category_id, id, userId]
        );
        return result.affectedRows > 0;
    }

    static async delete(id, userId) {
        const [result] = await db.query('DELETE FROM posts WHERE id = ? AND created_by = ?', [id, userId]);
        return result.affectedRows > 0;
    }

    static async findAll() {
        const [posts] = await db.query('SELECT * FROM posts');
        return posts;
    }

    static async findById(id) {
        const [posts] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        return posts[0];
    }
}

module.exports = Post;
