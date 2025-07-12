const express = require('express');
const SliderController = require('../controllers/sliderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, SliderController.create); // Crear slider
router.get('/', authMiddleware, SliderController.getAll); // Obtener todos los sliders
router.get('/:id', authMiddleware, SliderController.getById); // Obtener slider por ID
router.put('/:id', authMiddleware, SliderController.update); // Actualizar slider
router.delete('/:id', authMiddleware, SliderController.delete); // Eliminar slider
router.patch('/:id/status', authMiddleware, SliderController.toggleStatus); // Activar/inactivar slider

module.exports = router;
