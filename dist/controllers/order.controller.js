"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalOrdersTodayByStoreHandler = exports.getTotalRevenueByStoreHandler = exports.getOrderById = exports.fetchCourierRates = exports.getOrder = exports.getStoreOrders = exports.createOrder = void 0;
const courier_repository_1 = require("../repositories/courier.repository");
const order_service_1 = require("../services/order.service");
const prisma_1 = __importDefault(require("../utils/prisma"));
const createOrder = async (req, res) => {
    try {
        const { order, midtransTransaction } = await (0, order_service_1.createNewOrder)(req.body);
        const paymentStatus = midtransTransaction?.status || 'pending';
        res.status(201).json({
            success: true,
            data: order,
            payment_status: paymentStatus,
            midtrans_token: midtransTransaction && 'token' in midtransTransaction
                ? midtransTransaction.token
                : null,
            redirect_url: midtransTransaction && 'redirect_url' in midtransTransaction
                ? midtransTransaction.redirect_url
                : null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createOrder = createOrder;
const getStoreOrders = async (req, res) => {
    try {
        const userId = res.locals.user.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User not found' });
            return;
        }
        const store = await prisma_1.default.stores.findFirst({
            where: { userId },
            select: { id: true },
        });
        if (!store) {
            res.status(404).json({ message: 'Store not found for this user' });
            return;
        }
        const orders = await (0, order_service_1.getOrdersByStore)(store.id);
        res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        res.status(500).json({ message: errorMessage });
    }
};
exports.getStoreOrders = getStoreOrders;
const getOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = res.locals.user.id;
    try {
        const order = await (0, order_service_1.getOrderByIdService)(userId, orderId);
        res.status(200).json(order);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        res.status(403).json({ message: errorMessage });
    }
};
exports.getOrder = getOrder;
const fetchCourierRates = async (req, res) => {
    try {
        const { store_id, destination_area_id, items } = req.body;
        if (!store_id || !destination_area_id || !items || items.length === 0) {
            res
                .status(400)
                .json({ message: 'Missing required fields or items are empty' });
            return;
        }
        const selectedCouriers = await (0, courier_repository_1.getSelectedCouriers)();
        if (!selectedCouriers.length) {
            res.status(404).json({ message: 'No selected couriers found' });
            return;
        }
        const courierCodes = [
            ...new Set(selectedCouriers.map((courier) => courier.courier_code)),
        ].join(',');
        console.log('Courier codes sent to Biteship:', courierCodes);
        const formattedItems = items.map((item) => ({
            name: item.name || 'Unknown',
            description: item.description || 'No description',
            value: item.value || 0,
            weight: item.weight || 0,
            quantity: item.quantity || 1,
        }));
        const responseData = await (0, order_service_1.getCourierRates)(store_id, destination_area_id, formattedItems, courierCodes);
        console.log('Biteship API Response:', JSON.stringify(responseData, null, 2));
        const formattedRates = responseData.pricing
            .map((courier) => {
            console.log('Pricing from Biteship:', responseData.pricing);
            console.log('Courier from Biteship:', courier);
            console.log('Matching selected couriers:', selectedCouriers);
            const selectedCourier = selectedCouriers.find((selected) => selected.courier_code === courier.courier_code &&
                selected.courier_service_code === courier.courier_service_code);
            console.log('Selected Courier:', selectedCourier);
            if (!selectedCourier) {
                return null;
            }
            return {
                courier_id: selectedCourier.id,
                courier_name: courier.courier_name,
                courier_code: courier.courier_code,
                shipping_type: courier.shipping_type,
                service_code: courier.courier_service_code,
                service_name: courier.courier_service_name,
                description: courier.description,
                shipment_duration_range: courier.shipment_duration_range,
                shipment_duration_unit: courier.shipment_duration_unit,
                duration: courier.duration,
                price: courier.price,
            };
        })
            .filter(Boolean);
        res.json(formattedRates);
    }
    catch (error) {
        console.error('Error fetching courier rates:', error);
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Something went wrong',
        });
    }
};
exports.fetchCourierRates = fetchCourierRates;
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await prisma_1.default.orders.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getOrderById = getOrderById;
const getTotalRevenueByStoreHandler = async (req, res) => {
    try {
        const userId = res.locals.user.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized, please login first' });
            return;
        }
        const newRevenue = await (0, order_service_1.getNewRevenueByStore)(userId);
        const updatedUser = await prisma_1.default.users.findUnique({
            where: { id: userId },
            select: { balance: true, last_total_revenue: true },
        });
        res.json({
            newRevenue,
            updatedBalance: updatedUser?.balance,
            lastTotalRevenue: updatedUser?.last_total_revenue,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch new revenue' });
    }
};
exports.getTotalRevenueByStoreHandler = getTotalRevenueByStoreHandler;
const getTotalOrdersTodayByStoreHandler = async (req, res) => {
    try {
        const userId = res.locals.user.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized, store not found' });
            return;
        }
        const totalOrdersToday = await (0, order_service_1.getTotalOrdersTodayByStore)(userId);
        res.json({ totalOrdersToday });
    }
    catch (error) {
        console.error('Error fetching total orders today:', error);
        res.status(500).json({ error: 'Failed to fetch total orders today' });
    }
};
exports.getTotalOrdersTodayByStoreHandler = getTotalOrdersTodayByStoreHandler;
