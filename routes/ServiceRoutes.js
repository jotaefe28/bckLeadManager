const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ServiceController.createService);
router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServiceById);
router.put('/:id', authMiddleware, ServiceController.updateService);
router.delete('/:id', authMiddleware, ServiceController.deleteService);

module.exports = router;
