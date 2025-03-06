"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerAreaId = exports.getOrderById = exports.findStoreByUserId = exports.getOrdersByStoreId = exports.updateOrderWithTracking = exports.createOrder = exports.createGuestUser = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../utils/prisma"));
const createGuestUser = async (contactName) => {
    return prisma_1.default.users.create({
        data: {
            id: (0, uuid_1.v4)(),
            email: `guest-${(0, uuid_1.v4)()}@example.com`,
            name: contactName || 'Guest',
            password: '',
            phone: `guest-${(0, uuid_1.v4)()}`,
        },
    });
};
exports.createGuestUser = createGuestUser;
const createOrder = async (orderData, userId) => {
    let user = null;
    if (!userId) {
        user = await (0, exports.createGuestUser)(orderData.destination_contact_name);
        userId = user.id;
    }
    let totalPrice = 0;
    const store = await prisma_1.default.stores.findUnique({
        where: { id: orderData.storeId },
        include: { user: true, locations: true },
    });
    const orderItemsData = await Promise.all(orderData.order_items.map(async (item) => {
        const product = await prisma_1.default.products.findUnique({
            where: { id: item.productId },
            select: {
                price: true,
                weight: true,
                name: true,
                description: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
                variant: {
                    select: {
                        id: true,
                        combination: true,
                        price: true,
                        weight: true,
                    },
                },
            },
        });
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        const variant = product.variant[0];
        const itemPrice = variant?.price ?? product.price;
        const itemWeight = variant?.weight ?? product.weight;
        const variantName = variant?.combination ?? null;
        const itemTotalPrice = itemPrice * item.qty;
        totalPrice += itemTotalPrice;
        return {
            productId: item.productId,
            variantOptionValueId: variant?.id ?? null,
            variantName: variantName,
            qty: item.qty,
            price: itemPrice,
            weight: itemWeight,
            name: product.name,
            description: product.description,
            categories: product.categories,
            height: item.height ?? null,
            length: item.length ?? null,
            width: item.width ?? null,
        };
    }));
    const existingCourier = await prisma_1.default.couriers.findUnique({
        where: { id: orderData.courierId },
    });
    if (!existingCourier) {
        throw new Error(`Courier with ID ${orderData.courierId} not found`);
    }
    const order = await prisma_1.default.orders.create({
        data: {
            order_number: `ORD-${Date.now()}`,
            userId: userId || null,
            storeId: orderData.storeId,
            total_price: totalPrice,
            status: 'Belum Dibayar',
            payment_status: 'Belum Dibayar',
            payment_method: orderData.payment_method ?? null,
            origin_contact_name: store?.user.name || '',
            origin_contact_phone: store?.user.phone || '',
            origin_address: store?.locations[0]?.address || '',
            origin_postal_code: String(store?.locations[0]?.postal_code) || '',
            destination_contact_name: orderData.destination_contact_name || '',
            destination_contact_phone: orderData.destination_contact_phone || '',
            destination_address: orderData.destination_address || '',
            destination_postal_code: String(orderData.destination_postal_code) || '',
            courierId: orderData.courierId,
            rate_courier: orderData.rate_courier,
            created_at: new Date(),
            updated_at: new Date(),
            order_items: {
                create: orderItemsData.map((item) => ({
                    qty: item.qty,
                    price: item.price,
                    weight: item.weight,
                    height: item.height,
                    length: item.length,
                    width: item.width,
                    product: {
                        connect: { id: item.productId },
                    },
                })),
            },
        },
        include: {
            order_items: {
                include: {
                    product: {
                        include: {
                            categories: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                    variant: true,
                },
            },
            store: true,
            courier: true,
        },
    });
    return order;
};
exports.createOrder = createOrder;
const updateOrderWithTracking = async (orderId, trackingNumber) => {
    return prisma_1.default.orders.update({
        where: { id: orderId },
        data: {
            tracking_number: trackingNumber,
            status: 'Pesanan Baru',
        },
    });
};
exports.updateOrderWithTracking = updateOrderWithTracking;
const getOrdersByStoreId = async (storeId) => {
    return await prisma_1.default.orders.findMany({
        where: { storeId },
        include: {
            order_items: {
                include: {
                    product: true,
                },
            },
            store: true,
            user: true,
            courier: true,
            invoices: true,
        },
    });
};
exports.getOrdersByStoreId = getOrdersByStoreId;
const findStoreByUserId = async (userId) => {
    return await prisma_1.default.stores.findUnique({
        where: {
            userId: userId,
        },
    });
};
exports.findStoreByUserId = findStoreByUserId;
const getOrderById = async (orderId) => {
    return await prisma_1.default.orders.findUnique({
        where: { id: orderId },
        include: {
            order_items: {
                include: {
                    product: {
                        include: {
                            categories: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
            store: true,
            courier: true,
            invoices: {
                select: {
                    invoice_number: true,
                },
            },
        },
    });
};
exports.getOrderById = getOrderById;
const getSellerAreaId = async (storeId) => {
    const location = await prisma_1.default.locations.findFirst({
        where: { storeId, is_main_location: true },
        select: { area_id: true },
    });
    return location || null;
};
exports.getSellerAreaId = getSellerAreaId;
