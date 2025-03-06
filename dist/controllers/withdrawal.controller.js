"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusToSuccessReqPaymentController = exports.updateStatusToProcessingReqPaymentController = exports.updateStatusToRejectedReqPaymentController = exports.searchRejectedReqPaymentsController = exports.findRejectedReqPaymentController = exports.searchSuccessReqPaymentsController = exports.findSuccessReqPaymentController = exports.searchProcessingReqPaymentsController = exports.findProcessingReqPaymentController = exports.searchPendingReqPaymentsController = exports.findPendingReqPaymentController = exports.createReqPaymentController = exports.getUserWithdrawalsController = void 0;
const reqPaymentRepository = __importStar(require("../repositories/withdrawal.repository"));
const user_repository_1 = require("../repositories/user.repository");
const prisma_1 = __importDefault(require("../utils/prisma"));
const getUserWithdrawalsController = async (req, res) => {
    const { userId } = req.params;
    try {
        const withdrawals = await prisma_1.default.payment_requests.findMany({
            where: {
                sellerId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                store: {
                    select: {
                        name: true,
                        bank_accounts: true
                    }
                }
            }
        });
        res.status(200).json(withdrawals);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
exports.getUserWithdrawalsController = getUserWithdrawalsController;
const createReqPaymentController = async (req, res) => {
    const { sellerId, storeId, amount } = req.body;
    console.log(` storeId: ${storeId}, sellerId: ${sellerId}`);
    try {
        const findUniqueUser = await (0, user_repository_1.getUniqueUserByIdRepository)(sellerId);
        if (!findUniqueUser) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        if (findUniqueUser.balance === 0 || findUniqueUser.balance < amount) {
            res.status(400).json({ message: 'Saldo anda tidak cukup' });
            return;
        }
        if (!storeId) {
            res.status(400).json({ message: 'Please make a store first' });
            return;
        }
        if (amount < 20000) {
            res.status(400).json({ message: 'Withdrwal harus lebih dari 20.000' });
            return;
        }
        const data = {
            id: '',
            storeId: String(storeId),
            sellerId: String(sellerId),
            status: 'Pending',
            amount: Number(amount),
            message: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await prisma_1.default.users.update({
            where: { id: findUniqueUser.id },
            data: {
                balance: findUniqueUser.balance - amount,
            },
        });
        const createReqPayment = await reqPaymentRepository.createReqPaymentRepository(data);
        if (!createReqPayment) {
            res.status(400).json({ message: "Can't create req payment" });
            return;
        }
        res.status(201).json(createReqPayment);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.createReqPaymentController = createReqPaymentController;
const findPendingReqPaymentController = async (req, res) => {
    try {
        const findManyReqPendingPayment = await reqPaymentRepository.findPendingReqPaymentRepository();
        if (!findManyReqPendingPayment) {
            res.status(400).json({ message: "Can't find req pending payment" });
            return;
        }
        res.status(200).json(findManyReqPendingPayment);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findPendingReqPaymentController = findPendingReqPaymentController;
const searchPendingReqPaymentsController = async (req, res) => {
    const { name } = req.query;
    try {
        const searchPending = await reqPaymentRepository.searchPendingReqPaymentsRepository(name);
        if (!searchPending) {
            res.status(404).json({ message: 'can not find  pending seller' });
            return;
        }
        res.status(200).json(searchPending);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.searchPendingReqPaymentsController = searchPendingReqPaymentsController;
const findProcessingReqPaymentController = async (req, res) => {
    try {
        const findManyReqProcessingPayment = await reqPaymentRepository.findProcessingReqPaymentRepository();
        if (!findManyReqProcessingPayment) {
            res.status(400).json({ message: "Can't find req Processing payment" });
            return;
        }
        res.status(200).json(findManyReqProcessingPayment);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findProcessingReqPaymentController = findProcessingReqPaymentController;
const searchProcessingReqPaymentsController = async (req, res) => {
    const { name } = req.query;
    try {
        const searchProcessing = await reqPaymentRepository.searchProcessingReqPaymentsRepository(name);
        if (!searchProcessing) {
            res.status(404).json({ message: 'can not find  Processing seller' });
            return;
        }
        res.status(200).json(searchProcessing);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.searchProcessingReqPaymentsController = searchProcessingReqPaymentsController;
const findSuccessReqPaymentController = async (req, res) => {
    try {
        const findManyReqSuccessPayment = await reqPaymentRepository.findSuccessReqPaymentRepository();
        if (!findManyReqSuccessPayment) {
            res.status(400).json({ message: "Can't find req Success payment" });
            return;
        }
        res.status(200).json(findManyReqSuccessPayment);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findSuccessReqPaymentController = findSuccessReqPaymentController;
const searchSuccessReqPaymentsController = async (req, res) => {
    const { name } = req.query;
    try {
        const searchSuccess = await reqPaymentRepository.searchSuccessReqPaymentsRepository(name);
        if (!searchSuccess) {
            res.status(404).json({ message: 'can not find  Success seller' });
            return;
        }
        res.status(200).json(searchSuccess);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.searchSuccessReqPaymentsController = searchSuccessReqPaymentsController;
const findRejectedReqPaymentController = async (req, res) => {
    try {
        const findManyReqRejectedPayment = await reqPaymentRepository.findRejectedReqPaymentRepository();
        if (!findManyReqRejectedPayment) {
            res.status(400).json({ message: "Can't find req Rejected payment" });
            return;
        }
        res.status(200).json(findManyReqRejectedPayment);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findRejectedReqPaymentController = findRejectedReqPaymentController;
const searchRejectedReqPaymentsController = async (req, res) => {
    const { name } = req.query;
    try {
        const searchRejected = await reqPaymentRepository.searchRejectedReqPaymentsRepository(name);
        if (!searchRejected) {
            res.status(404).json({ message: 'can not find  Rejected seller' });
            return;
        }
        res.status(200).json(searchRejected);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.searchRejectedReqPaymentsController = searchRejectedReqPaymentsController;
const updateStatusToRejectedReqPaymentController = async (req, res) => {
    const { id } = req.params;
    try {
        const withdrawRequest = await prisma_1.default.payment_requests.findUnique({
            where: { id },
        });
        if (!withdrawRequest) {
            res.status(400).json({ message: 'Withdraw request not found' });
            return;
        }
        const sellerBalance = await prisma_1.default.users.findUnique({
            where: { id: withdrawRequest.sellerId },
        });
        if (!sellerBalance) {
            res.status(400).json({ message: 'Seller not found' });
            return;
        }
        await prisma_1.default.users.update({
            where: { id: withdrawRequest.sellerId },
            data: {
                balance: sellerBalance.balance + withdrawRequest.amount,
            },
        });
        const updateStatusToRejected = await reqPaymentRepository.updateStatusToRejectedReqPaymentRepository(id);
        if (!updateStatusToRejected) {
            res.status(400).json({ message: "Can't update to Rejected payment" });
            return;
        }
        res.status(201).json(updateStatusToRejected);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateStatusToRejectedReqPaymentController = updateStatusToRejectedReqPaymentController;
const updateStatusToProcessingReqPaymentController = async (req, res) => {
    const { id } = req.params;
    try {
        const updateStatusToProcessing = await reqPaymentRepository.updatedeStatusToProcessingReqPaymentRepository(id);
        if (!updateStatusToProcessing) {
            res.status(400).json({ message: "Can't update to Processing payment" });
            return;
        }
        res.status(201).json(updateStatusToProcessing);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateStatusToProcessingReqPaymentController = updateStatusToProcessingReqPaymentController;
const updateStatusToSuccessReqPaymentController = async (req, res) => {
    const { id } = req.params;
    try {
        const updateStatusToSuccess = await reqPaymentRepository.updatedeStatusToSuccessReqPaymentRepository(id);
        if (!updateStatusToSuccess) {
            res.status(400).json({ message: "Can't update to Success payment" });
            return;
        }
        res.status(201).json(updateStatusToSuccess);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateStatusToSuccessReqPaymentController = updateStatusToSuccessReqPaymentController;
