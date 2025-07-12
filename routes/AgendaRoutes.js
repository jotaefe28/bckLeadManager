const express = require('express');
const router = express.Router();
const AgendaController = require('../controllers/agendaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', AgendaController.createAgenda);
router.get('/', AgendaController.getAllAgendas);
router.get('/:id', AgendaController.getAgendaById);
router.delete('/:id', authMiddleware, AgendaController.deleteAgenda);

module.exports = router;
