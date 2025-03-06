"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.midtransWebhookTest = exports.midtransWebhook = exports.biteshipWebhook = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const biteship_service_1 = require("../services/biteship.service");
const order_repository_1 = require("../repositories/order.repository");
const uuid_1 = require("uuid");
const biteshipWebhook = async (req, res) => {
    try {
        console.log('Webhook received:', req.body);
        if (!req.body || Object.keys(req.body).length === 0) {
            res
                .status(200)
                .json({ success: true, message: 'Webhook installed successfully' });
            return;
        }
        const { order_id, status, courier_tracking_id, courier_waybill_id, courier_link, } = req.body;
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
        let orderStatus = '';
        switch (status) {
            case 'processed':
                orderStatus = 'Pesanan Baru';
                break;
            case 'allocated':
                orderStatus = 'Siap Dikirim';
                break;
            case 'picking_up':
            case 'picked':
            case 'dropping_off':
                orderStatus = 'Dalam Pengiriman';
                break;
            case 'delivered':
                orderStatus = 'Pesanan Selesai';
                break;
            default:
                orderStatus = order.status;
        }
        const updatedOrder = await prisma_1.default.orders.update({
            where: { id: order.id },
            data: {
                status: orderStatus,
                courier_tracking_id,
                courier_waybill_id,
                courier_link,
            },
        });
        console.log('Order updated:', { order_id, status: orderStatus });
        res.status(200).json({ success: true, message: 'Order status updated' });
        return;
    }
    catch (error) {
        console.error('Webhook error:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return;
    }
};
exports.biteshipWebhook = biteshipWebhook;
const midtransWebhook = async (req, res) => {
    try {
        const notification = req.body;
        console.log('Webhook Midtrans Diterima', notification);
        const { transaction_status, order_id, payment_type, transaction_id } = req.body;
        if (!transaction_status || !order_id) {
            res
                .status(400)
                .json({ message: 'Invalid request: Missing required parameters' });
            return;
        }
        if (transaction_status === 'settlement') {
            const order = await prisma_1.default.orders.findUnique({
                where: { id: order_id },
                include: {
                    store: {
                        include: {
                            user: true,
                            locations: true,
                        },
                    },
                    order_items: {
                        include: {
                            product: { include: { categories: true } },
                        },
                    },
                },
            });
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            const payment = await prisma_1.default.payments.create({
                data: {
                    bank: payment_type,
                    amount: order.total_price,
                    status: 'Success',
                    moota_transaction_id: transaction_id,
                },
            });
            const invoice = await prisma_1.default.invoices.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    prices: order.total_price,
                    status: 'Sudah Dibayar',
                    receiver_phone: order.destination_contact_phone ?? null,
                    receiver_address: order.destination_address ?? null,
                    receiver_name: order.destination_contact_name ?? null,
                    invoice_number: `INV-${Date.now()}`,
                    paymentId: payment.id,
                    courierId: order.courierId || '',
                    userId: order.store.userId,
                    orders: {
                        connect: { id: order.id },
                    },
                },
            });
            await prisma_1.default.confirmation_payment.create({
                data: {
                    amount: order.total_price,
                    bank: payment_type,
                    invoiceId: invoice.id,
                },
            });
            await prisma_1.default.invoice_histories.create({
                data: {
                    status: 'Sudah Dibayar',
                    invoiceId: invoice.id,
                },
            });
            await prisma_1.default.orders.update({
                where: { id: order.id },
                data: {
                    status: 'Pesanan Baru',
                    payment_status: 'Sudah Dibayar',
                    invoicesId: invoice.id,
                },
            });
            const biteshipResponse = await (0, biteship_service_1.createBiteshipOrder)(order);
            if (!biteshipResponse || !biteshipResponse.id) {
                throw new Error('Biteship order creation failed');
            }
            await (0, order_repository_1.updateOrderWithTracking)(order.id, biteshipResponse.id);
            res.status(200).json({
                message: 'Payment settled, invoice created, payment confirmed, and order created in Biteship',
            });
        }
        else {
            res.status(200).json({ message: 'Payment not settled yet' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
exports.midtransWebhook = midtransWebhook;
const midtransWebhookTest = async (req, res) => {
    try {
        const notification = req.body;
        console.log('=== Webhook Midtrans Diterima ===');
        console.log('Order ID:', notification.order_id);
        console.log('Status Code:', notification.status_code);
        console.log('Transaction Status:', notification.transaction_status);
        console.log('Fraud Status:', notification.fraud_status);
        console.log('Gross Amount:', notification.gross_amount);
        console.log('Signature Key:', notification.signature_key);
        console.log('===============================');
        res.status(200).json({ success: true, message: 'Webhook received' });
    }
    catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).json({ error: 'Failed to process webhook' });
        return;
    }
};
exports.midtransWebhookTest = midtransWebhookTest;
