const AgendaModel = require('../models/Agenda');

const AgendaService = {
    createAgenda: async (data) => {
        return await AgendaModel.create(data);
    },
    getAgendaById: async (id) => {
        const agenda = await AgendaModel.findById(id);
        if (!agenda) {
            throw new Error('La agenda no existe');
        }
        return agenda;
    },
    getAllAgendas: async () => {
        return await AgendaModel.findAll();
    },
    deleteAgenda: async (id) => {
        const agenda = await AgendaModel.findById(id);
        if (!agenda) {
            throw new Error('La agenda no existe');
        }
        return await AgendaModel.delete(id);
    }
};

module.exports = AgendaService;
