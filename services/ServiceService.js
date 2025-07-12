const ServiceModel = require('../models/Service');

const ServiceService = {
    createService: async (data) => {
        return await ServiceModel.create(data);
    },
    getServiceById: async (id) => {
        const service = await ServiceModel.findById(id);
        if (!service) {
            throw new Error('El servicio no existe');
        }
        return service;
    },
    getAllServices: async () => {
        return await ServiceModel.findAll();
    },
    updateService: async (id, data) => {
        const service = await ServiceModel.findById(id);
        if (!service) {
            throw new Error('El servicio no existe');
        }
        return await ServiceModel.update(id, data);
    },
    deleteService: async (id) => {
        const service = await ServiceModel.findById(id);
        if (!service) {
            throw new Error('El servicio no existe');
        }
        return await ServiceModel.delete(id);
    }
};

module.exports = ServiceService;
