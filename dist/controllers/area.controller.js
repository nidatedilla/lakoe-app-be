"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAreasByInput = void 0;
const area_service_1 = require("../services/area.service");
const searchAreasByInput = async (req, res) => {
    try {
        const { input, type = 'single' } = req.query;
        if (!input || typeof input !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Search input is required',
            });
        }
        const areas = await (0, area_service_1.searchAreas)(input, type);
        res.status(200).json({
            success: true,
            data: areas,
        });
    }
    catch (error) {
        console.error('Error in searchAreasByInput:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to search areas',
        });
    }
};
exports.searchAreasByInput = searchAreasByInput;
