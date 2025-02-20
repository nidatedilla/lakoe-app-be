"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVillages = exports.getDistricts = exports.getRegencies = exports.getProvinces = void 0;
const axios_1 = __importDefault(require("axios"));
exports.getProvinces = (async (req, res) => {
    try {
        const response = await axios_1.default.get(`
  https://wilayah.id/api/provinces.json`);
        res.json(response.data);
    }
    catch (error) {
        console.error(`Error fetching regencies for province `, error);
        res.status(500).json({ error: 'Failed to fetch regencies' });
    }
});
const getRegencies = async (req, res) => {
    const provinceCode = req.params.provinceCode;
    try {
        const response = await axios_1.default.get(`
  https://wilayah.id/api/regencies/${provinceCode}.json`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching Regencies:', error);
        res.status(500).json({
            error: 'Failed to fetch Regencies',
            message: error.message || 'Internal server error',
        });
    }
};
exports.getRegencies = getRegencies;
const getDistricts = async (req, res) => {
    const regencieCode = req.params.regencieCode;
    try {
        const response = await axios_1.default.get(`
  https://wilayah.id/api/districts/${regencieCode}.json`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({
            error: 'Failed to fetch provinces',
            message: error.message || 'Internal server error',
        });
    }
};
exports.getDistricts = getDistricts;
const getVillages = async (req, res) => {
    const districtsCode = req.params.districtsCode;
    try {
        const response = await axios_1.default.get(`
  https://wilayah.id/api/villages/${districtsCode}.json`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({
            error: 'Failed to fetch provinces',
            message: error.message || 'Internal server error',
        });
    }
};
exports.getVillages = getVillages;
