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
exports.getStoreDomain = exports.getStoreWithProducts = exports.deleteStoreController = exports.updateStoreController = exports.findUniqueStoreController = exports.getStoreController = void 0;
const storeService = __importStar(require("../services/store.service"));
const store_repository_1 = require("../repositories/store.repository");
const getStoreController = async (req, res) => {
    try {
        const store = await storeService.getStoreService();
        res.status(200).json(store);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getStoreController = getStoreController;
const findUniqueStoreController = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await storeService.findUniqueStoreService(id);
        res.status(200).json(store);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.findUniqueStoreController = findUniqueStoreController;
const updateStoreController = async (req, res) => {
    const id = res.locals.user.id;
    const { body } = req;
    try {
        const store = await storeService.updateStoreService(id, body);
        res.status(200).json(store);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateStoreController = updateStoreController;
const deleteStoreController = async (req, res) => {
    const userId = res.locals.user.id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const findStoreId = await (0, store_repository_1.findUniqueStoreRepository)(userId);
        console.log(findStoreId?.id);
        if (!findStoreId) {
            res.status(400).json({ message: 'Store does not exist' });
            return;
        }
        if (findStoreId.userId !== userId) {
            res.status(403).json({
                message: 'Forbidden: You do not have permission to delete this store',
            });
            return;
        }
        const deleteStore = await storeService.deleteStoreService(findStoreId.id);
        res.status(200).json({ message: 'Store deleted', deleteStore });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.deleteStoreController = deleteStoreController;
const getStoreWithProducts = async (req, res) => {
    try {
        const { domain } = req.params;
        const storeData = await storeService.fetchStoreWithProducts(domain);
        res.json(storeData);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getStoreWithProducts = getStoreWithProducts;
const getStoreDomain = async (req, res) => {
    try {
        const userId = res.locals.user.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const store = await storeService.getStoreDomainByUserId(userId);
        if (!store) {
            res.status(404).json({ message: 'Shop not found' });
            return;
        }
        res.json({ domain: store.domain });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getStoreDomain = getStoreDomain;
