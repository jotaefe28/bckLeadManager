const SpecializationAreaService = require('../services/AreaService');

const SpecializationAreaController = {
    createArea: async (req, res) => {
        try {
            const data = {
                title: req.body.title,
                created_by: req.userId
            };
            await SpecializationAreaService.createArea(data);
            res.status(201).json({ message: 'Área de especialización creada con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAllAreas: async (req, res) => {
        try {
            const areas = await SpecializationAreaService.getAllAreas();
            res.json(areas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAreaById: async (req, res) => {
        try {
            const id = req.params.id;
            const area = await SpecializationAreaService.getAreaById(id);
            res.json(area);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    updateArea: async (req, res) => {
        try {
            const id = req.params.id;
            const data = {
                title: req.body.title
            };
            await SpecializationAreaService.updateArea(id, data);
            res.json({ message: 'Área de especialización actualizada con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteArea: async (req, res) => {
        try {
            const id = req.params.id;
            await SpecializationAreaService.deleteArea(id);
            res.json({ message: 'Área de especialización eliminada con éxito' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = SpecializationAreaController;
