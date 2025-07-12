const AgendaService = require('../services/AgendaService');

const AgendaController = {
    createAgenda: async (req, res) => {
        try {
            const data = {
                name: req.body.name,
                company: req.body.company,
                email: req.body.email,
                phone: req.body.phone,
                service: req.body.service,
                message: req.body.message
            };
            await AgendaService.createAgenda(data);
            res.status(201).json({ message: 'Agenda creada con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAllAgendas: async (req, res) => {
        try {
            const agendas = await AgendaService.getAllAgendas();
            res.json(agendas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAgendaById: async (req, res) => {
        try {
            const id = req.params.id;
            const agenda = await AgendaService.getAgendaById(id);
            res.json(agenda);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deleteAgenda: async (req, res) => {
        try {
            const id = req.params.id;
            await AgendaService.deleteAgenda(id);
            res.json({ message: 'Agenda eliminada con éxito' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = AgendaController;
