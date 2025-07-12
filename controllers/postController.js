const PostService = require('../services/PostService');

exports.createPost = async (req, res) => {
    try {
        const post = await PostService.createPost({
            ...req.body,
            created_by: req.userId
        });
        res.status(201).json({ message: 'Post creado', post });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await PostService.updatePost(id, req.body, req.userId);
        res.status(200).json({ message: 'Post actualizado', post: updatedPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await PostService.deletePost(id, req.userId);
        res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await PostService.getPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostService.getPostById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
