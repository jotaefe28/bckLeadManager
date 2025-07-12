const Post = require('../models/Post');

class PostService {
    static async createPost(data) {
        return await Post.create(data);
    }

    static async updatePost(id, data, userId) {
        const updated = await Post.update(id, data, userId);
        if (!updated) {
            throw new Error('No se pudo actualizar el post o no tienes permisos');
        }
        return { id, ...data };
    }

    static async deletePost(id, userId) {
        const deleted = await Post.delete(id, userId);
        if (!deleted) {
            throw new Error('No se pudo eliminar el post o no tienes permisos');
        }
    }

    static async getPosts() {
        return await Post.findAll();
    }

    static async getPostById(id) {
        const post = await Post.findById(id);
        if (!post) {
            throw new Error('Post no encontrado');
        }
        return post;
    }
}

module.exports = PostService;
