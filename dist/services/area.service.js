"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAreas = void 0;
const area_repository_1 = require("../repositories/area.repository");
const searchAreas = async (searchInput, type = 'single') => {
    try {
        if (!searchInput) {
            throw new Error('Search input is required');
        }
        const areas = await (0, area_repository_1.searchAreasFromBiteship)(searchInput, type);
        return areas;
    }
    catch (error) {
        console.error('Error in searchAreas service:', error);
        throw error;
    }
};
exports.searchAreas = searchAreas;
