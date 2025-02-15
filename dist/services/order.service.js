"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourierRates = exports.getOrderByIdService = exports.getOrdersByStore = exports.createNewOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const order_repository_1 = require("../repositories/order.repository");
const biteship_service_1 = require("./biteship.service");
const biteship_1 = require("../config/biteship");
const createNewOrder = async (orderData) => {
    let userId = orderData.userId;
    if (!userId) {
        const guestUser = await (0, order_repository_1.createGuestUser)(orderData.destination_contact_name);
        userId = guestUser.id;
    }
    const order = await (0, order_repository_1.createOrder)(orderData, userId);
    const updatedOrderData = {
        ...orderData,
        order_items: order.order_items.map((item) => ({
            ...item,
            product: {
                ...item.product,
                categories: item.product.categories,
            },
        })),
    };
    const biteshipResponse = await (0, biteship_service_1.createBiteshipOrder)(updatedOrderData);
    await (0, order_repository_1.updateOrderWithTracking)(order.id, biteshipResponse.id);
    return { order, biteshipResponse };
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
