const SpecializationAreaModel = require('../models/Area');

const SpecializationAreaService = {
    createArea: async (data) => {
        return await SpecializationAreaModel.create(data);
    },
    getAreaById: async (id) => {
        const area = await SpecializationAreaModel.findById(id);
        if (!area) {
            throw new Error('El área de especialización no existe');
        }
        return area;
    },
    getAllAreas: async () => {
        return await SpecializationAreaModel.findAll();
    },
    updateArea: async (id, data) => {
        const area = await SpecializationAreaModel.findById(id);
        if (!area) {
            throw new Error('El área de especialización no existe');
        }
        return await SpecializationAreaModel.update(id, data);
    },
    deleteArea: async (id) => {
        const area = await SpecializationAreaModel.findById(id);
        if (!area) {
            throw new Error('El área de especialización no existe');
        }
        return await SpecializationAreaModel.delete(id);
    }
};

module.exports = SpecializationAreaService;
