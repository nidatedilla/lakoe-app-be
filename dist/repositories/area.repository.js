"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAreasFromBiteship = void 0;
const axios_1 = __importDefault(require("axios"));
const biteship_1 = require("../config/biteship");
const searchAreasFromBiteship = async (input, type = 'single') => {
    try {
        const response = await axios_1.default.get(`${biteship_1.BITESHIP_BASE_URL}/v1/maps/areas`, {
            headers: {
                Authorization: `Bearer ${biteship_1.BITESHIP_API_KEY}`,
            },
            params: {
                countries: 'ID',
                input,
                type,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error searching areas from Biteship:', error);
        throw new Error('Failed to search areas');
    }
};
exports.searchAreasFromBiteship = searchAreasFromBiteship;
