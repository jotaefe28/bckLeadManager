const SliderModel = require('../models/Slider');

const SliderService = {
    async createSlider(sliderData) {
        return await SliderModel.create(sliderData);
    },

    async getAllSliders() {
        const rta = await SliderModel.findAll();
        return rta;
    },

    async getSliderById(id) {
        const slider = await SliderModel.findById(id);
        if (!slider) {
            throw new Error('Slider no encontrado');
        }
        return slider;
    },

    async updateSlider(id, sliderData) {
        const exists = await SliderModel.findById(id);
        if (!exists) {
            throw new Error('Slider no encontrado');
        }
        return await SliderModel.update(id, sliderData);
    },

    async deleteSlider(id) {
        const exists = await SliderModel.findById(id);
        if (!exists) {
            throw new Error('Slider no encontrado');
        }
        return await SliderModel.delete(id);
    },

    async toggleSliderStatus(id, isActive) {
        const exists = await SliderModel.findById(id);
        if (!exists) {
            throw new Error('Slider no encontrado');
        }
        return await SliderModel.toggleActiveStatus(id, isActive);
    }
};

module.exports = SliderService;
