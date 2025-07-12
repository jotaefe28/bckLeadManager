const SliderService = require('../services/SliderService');

const SliderController = {
    async create(req, res) {
        try {
            const created_by = req.userId; // Usando el userId del token
            const sliderData = { ...req.body, created_by };
            const sliderId = await SliderService.createSlider(sliderData);
            res.status(201).json({ message: 'Slider creado con éxito', sliderId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        
        try {
            const sliders = await SliderService.getAllSliders();
            res.json(sliders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const slider = await SliderService.getSliderById(id);
            res.json(slider);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const sliderData = req.body;
            await SliderService.updateSlider(id, sliderData);
            res.json({ message: 'Slider actualizado con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await SliderService.deleteSlider(id);
            res.json({ message: 'Slider eliminado con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { is_active } = req.body; // Enviar true o false
            await SliderService.toggleSliderStatus(id, is_active);
            res.json({ message: `Estado del slider actualizado a ${is_active}` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = SliderController;
