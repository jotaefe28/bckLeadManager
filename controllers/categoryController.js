const CategoryService = require('../services/CategoryService');

exports.createCategory = async (req, res) => {
    try {
        const category = await CategoryService.createCategory({
            ...req.body,
            created_by: req.userId
        });
        res.status(201).json({ message: 'Categoría creada', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategory = await CategoryService.updateCategory(id, req.body, req.userId);
        res.status(200).json({ message: 'Categoría actualizada', category: updatedCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryService.deleteCategory(id, req.userId);
        res.status(200).json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryService.getCategoryById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
