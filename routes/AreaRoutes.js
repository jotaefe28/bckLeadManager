const express = require('express');
const router = express.Router();
const SpecializationAreaController = require('../controllers/areaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, SpecializationAreaController.createArea);
router.get('/', SpecializationAreaController.getAllAreas);
router.get('/:id', SpecializationAreaController.getAreaById);
router.put('/:id', authMiddleware, SpecializationAreaController.updateArea);
router.delete('/:id', authMiddleware, SpecializationAreaController.deleteArea);

module.exports = router;
