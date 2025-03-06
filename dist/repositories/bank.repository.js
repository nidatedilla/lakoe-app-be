"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBankrepository = exports.findBankByIdrepository = exports.findAllBankrepository = exports.createBankrepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createBankrepository = async (bank) => {
    const existingBank = await prisma_1.default.bank_accounts.findUnique({
        where: {
            userId: bank.userId,
        },
    });
    if (existingBank) {
        return await prisma_1.default.bank_accounts.update({
            where: {
                userId: bank.userId,
            },
            data: {
                bank: bank.bank,
                acc_name: bank.acc_name,
                acc_num: bank.acc_num,
            },
        });
    }
    else {
        return await prisma_1.default.bank_accounts.create({
            data: {
                bank: bank.bank,
                userId: bank.userId,
                acc_name: bank.acc_name,
                acc_num: bank.acc_num,
                storeId: bank.storeId,
            },
        });
    }
};
exports.createBankrepository = createBankrepository;
const findAllBankrepository = async () => {
    return await prisma_1.default.bank_accounts.findMany();
};
exports.findAllBankrepository = findAllBankrepository;
const findBankByIdrepository = async (userId) => {
    return await prisma_1.default.bank_accounts.findUnique({
        where: {
            userId,
        },
    });
};
exports.findBankByIdrepository = findBankByIdrepository;
const deleteBankrepository = async (id) => {
    return await prisma_1.default.bank_accounts.delete({
        where: {
            id,
        },
    });
};
exports.deleteBankrepository = deleteBankrepository;
