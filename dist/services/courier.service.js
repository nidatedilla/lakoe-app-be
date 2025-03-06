"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSelectedCouriers = exports.toggleCourierSelection = exports.fetchAllCouriers = exports.getCouriers = void 0;
const courier_repository_1 = require("../repositories/courier.repository");
const getCouriers = async () => {
    return await (0, courier_repository_1.fetchCouriersFromBiteship)();
};
exports.getCouriers = getCouriers;
const fetchAllCouriers = async () => {
    return await (0, courier_repository_1.getAllCouriers)();
};
exports.fetchAllCouriers = fetchAllCouriers;
const toggleCourierSelection = async (courierId) => {
    try {
        const courier = await (0, courier_repository_1.findCourierById)(courierId);
        if (!courier) {
            throw new Error('Courier not found');
        }
        const updatedCourier = await (0, courier_repository_1.updateCourierSelection)(courierId, !courier.is_selected);
        return updatedCourier;
    }
    catch (error) {
        console.error('Error toggling courier selection:', error);
        throw error;
    }
};
exports.toggleCourierSelection = toggleCourierSelection;
const getAllSelectedCouriers = async () => {
    try {
        return await (0, courier_repository_1.getSelectedCouriers)();
    }
    catch (error) {
        console.error('Error getting selected couriers:', error);
        throw error;
    }
};
exports.getAllSelectedCouriers = getAllSelectedCouriers;
