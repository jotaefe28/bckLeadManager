const ServiceService = require('../services/ServiceService');

const ServiceController = {
    createService: async (req, res) => {
        try {
            const data = {
                title: req.body.title,
                specialization_area_id: req.body.specialization_area_id,
                created_by: req.userId
            };
            await ServiceService.createService(data);
            res.status(201).json({ message: 'Servicio creado con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAllServices: async (req, res) => {
        try {
            const services = await ServiceService.getAllServices();
            res.json(services);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getServiceById: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceService.getServiceById(id);
            res.json(service);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    updateService: async (req, res) => {
        try {
            const id = req.params.id;
            const data = {
                title: req.body.title,
                specialization_area_id: req.body.specialization_area_id
            };
            await ServiceService.updateService(id, data);
            res.json({ message: 'Servicio actualizado con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteService: async (req, res) => {
        try {
            const id = req.params.id;
            await ServiceService.deleteService(id);
            res.json({ message: 'Servicio eliminado con éxito' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = ServiceController;
