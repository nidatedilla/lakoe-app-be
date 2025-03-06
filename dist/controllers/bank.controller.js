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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBank = exports.findBankById = exports.findAllBank = exports.createBank = void 0;
const bankRepository = __importStar(require("../repositories/bank.repository"));
const user_repository_1 = require("../repositories/user.repository");
const createBank = async (req, res) => {
    const { bank, acc_num, acc_name } = req.body;
    const id = res.locals.user.id;
    try {
        const store_id = await (0, user_repository_1.getMeRepository)(id);
        if (!store_id) {
            res.status(404).json({ error: 'Store not found' });
            return;
        }
        console.log(store_id);
        const storeId = store_id.stores?.id;
        if (!bank || !acc_num || !acc_name) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }
        if (!storeId) {
            res.status(404).json({ error: 'Store not found' });
            return;
        }
        const createBank = await bankRepository.createBankrepository({
            id: id,
            bank,
            storeId,
            acc_num,
            acc_name,
            userId: id
        });
        res.status(201).json(createBank);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.createBank = createBank;
const findAllBank = async (req, res) => {
    try {
        const banks = await bankRepository.findAllBankrepository();
        res.status(200).json(banks);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findAllBank = findAllBank;
const findBankById = async (req, res) => {
    const id = req.params.id;
    try {
        const bank = await bankRepository.findBankByIdrepository(id);
        if (!bank) {
            res.status(404).json({ error: 'Bank not found' });
            return;
        }
        res.status(200).json(bank);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findBankById = findBankById;
const deleteBank = async (req, res) => {
    const id = req.params.id;
    try {
        const bank = await bankRepository.findBankByIdrepository(id);
        if (!bank) {
            res.status(404).json({ error: 'Bank not found' });
            return;
        }
        const deletedBank = await bankRepository.deleteBankrepository(id);
        res.status(200).json(deletedBank);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.deleteBank = deleteBank;
