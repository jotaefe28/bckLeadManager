const GuestModel = require('../models/Guest');

const AgendaService = {
    createAgenda: async (data) => {
        console.log('la data',data);
        return await GuestModel.create(data);
    },
    getAgendaById: async (id) => {
        const agenda = await GuestModel.findById(id);
        if (!agenda) {
            throw new Error('La agenda no existe');
        }
        return agenda;
    },
    getAllAgendas: async () => {
        return await GuestModel.findAll();
    },
    deleteAgenda: async (id) => {
        const agenda = await GuestModel.findById(id);
        if (!agenda) {
            throw new Error('La agenda no existe');
        }
        return await GuestModel.delete(id);
    }
};

module.exports = AgendaService;
