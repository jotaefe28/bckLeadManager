const Category = require('../models/Category');

class CategoryService {
    static async createCategory(data) {
        return await Category.create(data);
    }

    static async updateCategory(id, data, userId) {
        const updated = await Category.update(id, data, userId);
        if (!updated) {
            throw new Error('No se pudo actualizar la categoría o no tienes permisos');
        }
        return { id, ...data };
    }

    static async deleteCategory(id, userId) {
        const deleted = await Category.delete(id, userId);
        if (!deleted) {
            throw new Error('No se pudo eliminar la categoría o no tienes permisos');
        }
    }

    static async getCategories() {
        return await Category.findAll();
    }

    static async getCategoryById(id) {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        return category;
    }
}

module.exports = CategoryService;
