"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMidtransTransaction = void 0;
const midtrans_1 = __importDefault(require("../config/midtrans"));
const createMidtransTransaction = async (order) => {
    try {
        const orderId = order.id;
        const grossAmount = order.total_price;
        if (!orderId || !grossAmount) {
            throw new Error('Invalid order data');
        }
        const customerDetails = {
            first_name: order.destination_contact_name,
            last_name: '',
            email: order.customer_email,
            phone: order.destination_contact_phone,
        };
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            credit_card: {
                secure: true,
            },
            customer_details: customerDetails,
        };
        const transaction = await midtrans_1.default.createTransaction(parameter);
        const transactionStatus = transaction.transaction_status;
        return {
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            status: transactionStatus,
        };
    }
    catch (error) {
        console.error('Midtrans Error:', error);
        throw new Error('Failed to create transaction');
    }
};
exports.createMidtransTransaction = createMidtransTransaction;
