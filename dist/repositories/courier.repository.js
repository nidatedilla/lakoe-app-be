"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedCouriers = exports.updateCourierSelection = exports.findCourierById = exports.getAllCouriers = exports.fetchCouriersFromBiteship = void 0;
const axios_1 = __importDefault(require("axios"));
const biteship_1 = require("../config/biteship");
const prisma_1 = __importDefault(require("../utils/prisma"));
const fetchCouriersFromBiteship = async () => {
    try {
        const response = await axios_1.default.get(`${biteship_1.BITESHIP_BASE_URL}/v1/couriers`, {
            headers: {
                Authorization: `Bearer ${biteship_1.BITESHIP_API_KEY}`,
            },
        });
        return response.data.couriers;
    }
    catch (error) {
        console.error('Error fetching courier data from Biteship:', error);
        throw new Error('Failed to fetch courier data');
    }
};
exports.fetchCouriersFromBiteship = fetchCouriersFromBiteship;
const getAllCouriers = async () => {
    return await prisma_1.default.couriers.findMany();
};
exports.getAllCouriers = getAllCouriers;
const findCourierById = async (courierId) => {
    return await prisma_1.default.couriers.findUnique({
        where: { id: courierId },
    });
};
exports.findCourierById = findCourierById;
const updateCourierSelection = async (courierId, isSelected) => {
    try {
        return await prisma_1.default.couriers.update({
            where: { id: courierId },
            data: { is_selected: isSelected },
        });
    }
    catch (error) {
        console.error('Error updating courier selection:', error);
        throw new Error('Failed to update courier selection');
    }
};
exports.updateCourierSelection = updateCourierSelection;
const getSelectedCouriers = async () => {
    try {
        return await prisma_1.default.couriers.findMany({
            where: { is_selected: true },
        });
    }
    catch (error) {
        console.error('Error getting selected couriers:', error);
        throw new Error('Failed to get selected couriers');
    }
};
exports.getSelectedCouriers = getSelectedCouriers;
// export const getCourierRatesRepository = async (data: any) => {
//   try {
//     const response = await axios.post(
//       `${BITESHIP_BASE_URL}/v1/rates/couriers`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${BITESHIP_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       'Error fetching courier rates:',
//       error.response?.data || error.message,
//     );
//     throw new Error('Failed to fetch courier rates from Biteship');
//   }
// };
