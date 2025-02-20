"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBiteshipOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const biteship_1 = require("../config/biteship");
const createBiteshipOrder = async (orderData) => {
    const items = await Promise.all(orderData.order_items.map(async (item) => {
        const product = item.product;
        const categories = product?.categories.map((cat) => cat.name).join(', ') || '';
        return {
            name: product?.name,
            description: product?.description,
            category: categories,
            value: product?.price,
            quantity: item.qty,
            height: item.height,
            length: item.length,
            weight: item.weight,
            width: item.width,
        };
    }));
    const payload = {
        shipper_contact_name: orderData.shipper_contact_name || '',
        shipper_contact_phone: orderData.shipper_contact_phone || '',
        shipper_contact_email: orderData.shipper_contact_email || '',
        shipper_organization: orderData.shipper_organization || '',
        origin_contact_name: orderData.origin_contact_name || '',
        origin_contact_phone: orderData.origin_contact_phone || '',
        origin_address: orderData.origin_address || '',
        origin_note: orderData.origin_note || '',
        origin_postal_code: String(orderData.origin_postal_code) || '',
        destination_contact_name: orderData.destination_contact_name || '',
        destination_contact_phone: orderData.destination_contact_phone || '',
        destination_contact_email: orderData.destination_contact_email || '',
        destination_address: orderData.destination_address || '',
        destination_postal_code: String(orderData.destination_postal_code) || '',
        destination_note: orderData.destination_note || '',
        courier_company: orderData.courier_company || '',
        courier_type: orderData.courier_type || '',
        courier_insurance: orderData.courier_insurance || 0,
        delivery_type: orderData.delivery_type || 'now',
        order_note: orderData.order_note || '',
        metadata: orderData.metadata || {},
        items: items,
    };
    try {
        const response = await axios_1.default.post(`${biteship_1.BITESHIP_BASE_URL}/v1/orders`, payload, {
            headers: {
                Authorization: `Bearer ${biteship_1.BITESHIP_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Biteship Response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error from Biteship API:', error.response?.data || error.message);
        throw error;
    }
};
exports.createBiteshipOrder = createBiteshipOrder;
