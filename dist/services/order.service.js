"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalOrdersTodayByStore = exports.getNewRevenueByStore = exports.getCourierRates = exports.getOrderByIdService = exports.getOrdersByStore = exports.createNewOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const order_repository_1 = require("../repositories/order.repository");
const biteship_1 = require("../config/biteship");
const transaction_controller_1 = require("../controllers/transaction.controller");
const prisma_1 = __importDefault(require("../utils/prisma"));
const createNewOrder = async (orderData) => {
    let userId = orderData.userId;
    if (!userId) {
        const guestUser = await (0, order_repository_1.createGuestUser)(orderData.destination_contact_name);
        userId = guestUser.id;
    }
    const order = await (0, order_repository_1.createOrder)(orderData, userId);
    const midtransTransaction = await (0, transaction_controller_1.createMidtransTransaction)(order);
    return { order, midtransTransaction };
};
exports.createNewOrder = createNewOrder;
const getOrdersByStore = async (storeId) => {
    if (!storeId) {
        throw new Error('Store ID is required');
    }
    return await (0, order_repository_1.getOrdersByStoreId)(storeId);
};
exports.getOrdersByStore = getOrdersByStore;
const getOrderByIdService = async (userId, orderId) => {
    const store = await (0, order_repository_1.findStoreByUserId)(userId);
    if (!store) {
        throw new Error('Store not found for user');
    }
    const order = await (0, order_repository_1.getOrderById)(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    if (order.storeId !== store.id) {
        throw new Error('Unauthorized: You do not have access to this order');
    }
    return order;
};
exports.getOrderByIdService = getOrderByIdService;
const getCourierRates = async (storeId, destinationAreaId, items, couriers) => {
    const location = await (0, order_repository_1.getSellerAreaId)(storeId);
    if (!location || !location.area_id) {
        throw new Error('Store location not found');
    }
    const response = await axios_1.default.post(`${biteship_1.BITESHIP_BASE_URL}/v1/rates/couriers`, {
        origin_area_id: location.area_id,
        destination_area_id: destinationAreaId,
        couriers: couriers,
        items: items,
    }, {
        headers: {
            Authorization: `Bearer ${biteship_1.BITESHIP_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
exports.getCourierRates = getCourierRates;
const getNewRevenueByStore = async (userId) => {
    const store = await prisma_1.default.stores.findFirst({
        where: { userId },
        select: { id: true },
    });
    if (!store) {
        throw new Error('User does not own any store');
    }
    // Ambil total revenue terakhir yang disimpan di database
    const user = await prisma_1.default.users.findUnique({
        where: { id: userId },
        select: { last_total_revenue: true, balance: true },
    });
    const lastTotalRevenue = user?.last_total_revenue || 0;
    // Hitung total revenue saat ini
    const totalRevenue = await prisma_1.default.orders.aggregate({
        _sum: {
            total_price: true,
        },
        where: {
            status: 'Pesanan Selesai',
            storeId: store.id,
        },
    });
    const currentRevenue = totalRevenue._sum.total_price || 0;
    const newRevenue = currentRevenue - lastTotalRevenue;
    if (newRevenue > 0) {
        await prisma_1.default.users.update({
            where: { id: userId },
            data: {
                last_total_revenue: currentRevenue,
                balance: user?.balance ? user.balance + newRevenue : newRevenue,
            },
        });
    }
    return newRevenue;
};
exports.getNewRevenueByStore = getNewRevenueByStore;
const getTotalOrdersTodayByStore = async (userId) => {
    const store = await prisma_1.default.stores.findFirst({
        where: { userId },
        select: { id: true },
    });
    if (!store) {
        return 0;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const totalOrdersToday = await prisma_1.default.orders.count({
        where: {
            storeId: store.id,
            status: 'Pesanan Selesai',
            created_at: {
                gte: today,
                lt: tomorrow,
            },
        },
    });
    return totalOrdersToday;
};
exports.getTotalOrdersTodayByStore = getTotalOrdersTodayByStore;
