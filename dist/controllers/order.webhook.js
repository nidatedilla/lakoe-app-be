"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.biteshipWebhook = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const biteshipWebhook = async (req, res) => {
    try {
        console.log('Webhook received:', req.body);
        if (!req.body || Object.keys(req.body).length === 0) {
            res
                .status(200)
                .json({ success: true, message: 'Webhook installed successfully' });
            return;
        }
        const { order_id, status } = req.body;
        if (!order_id || !status) {
            res.status(400).json({ success: false, message: 'Invalid payload' });
            return;
        }
        const order = await prisma_1.default.orders.findFirst({
            where: { tracking_number: order_id },
        });
        if (!order) {
            console.warn('Order not found:', order_id);
            res.status(200).json({ success: false, message: 'Order not found' });
            return;
        }
        await prisma_1.default.orders.update({
            where: { id: order.id },
            data: { status },
        });
        console.log('Order updated:', { order_id, status });
        res.status(200).json({ success: true, message: 'Order status updated' });
    }
    catch (error) {
        console.error('Webhook error:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
exports.biteshipWebhook = biteshipWebhook;
