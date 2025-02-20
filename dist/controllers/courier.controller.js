"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedCouriers = exports.toggleCourierSelections = exports.getAllCouriers = exports.getCourierData = void 0;
const courier_service_1 = require("../services/courier.service");
const getCourierData = async (req, res) => {
    try {
        const couriers = await (0, courier_service_1.getCouriers)();
        res.status(200).json({ success: true, couriers });
    }
    catch (error) {
        console.error('Error in getCourierData:', error);
        res
            .status(500)
            .json({ success: false, message: 'Failed to retrieve courier data' });
    }
};
exports.getCourierData = getCourierData;
const getAllCouriers = async (req, res) => {
    try {
        const couriers = await (0, courier_service_1.fetchAllCouriers)();
        res.json({ success: true, data: couriers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
exports.getAllCouriers = getAllCouriers;
const toggleCourierSelections = async (req, res) => {
    try {
        const { courierId } = req.params;
        const updatedCourier = await (0, courier_service_1.toggleCourierSelection)(courierId);
        res.status(200).json({
            success: true,
            message: 'Courier selection updated successfully',
            data: updatedCourier,
        });
    }
    catch (error) {
        console.error('Error in toggleCourierSelections:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update courier selection',
        });
    }
};
exports.toggleCourierSelections = toggleCourierSelections;
const getSelectedCouriers = async (req, res) => {
    try {
        const selectedCouriers = await (0, courier_service_1.getAllSelectedCouriers)();
        res.status(200).json({
            success: true,
            data: selectedCouriers,
        });
    }
    catch (error) {
        console.error('Error in getSelectedCouriers:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get selected couriers',
        });
    }
};
exports.getSelectedCouriers = getSelectedCouriers;
// export const getCourierRates = async (req: Request, res: Response) => {
//   try {
//     const { origin_area_id, destination_area_id, couriers, items } = req.body;
//     if (!origin_area_id || !destination_area_id || !couriers || !items) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Missing required fields' });
//     }
//     const rates = await getCourierRatesService(
//       origin_area_id,
//       destination_area_id,
//       couriers,
//       items,
//     );
//     return res.status(200).json({ success: true, rates });
//   } catch (error: any) {
//     console.error('Error in getCourierRates:', error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
