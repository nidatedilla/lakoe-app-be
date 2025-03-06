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
exports.getStoreLogoByDomain = exports.getStoreDomainByUserId = exports.fetchStoreWithProducts = exports.deleteStoreService = exports.updateStoreService = exports.findUniqueStoreService = exports.getStoreService = void 0;
const storeRepository = __importStar(require("../repositories/store.repository"));
const getStoreService = async () => {
    return await storeRepository.getStoreRepository();
};
exports.getStoreService = getStoreService;
const findUniqueStoreService = async (id) => {
    return await storeRepository.findUniqueStoreRepository(id);
};
exports.findUniqueStoreService = findUniqueStoreService;
const updateStoreService = async (id, store) => {
    return await storeRepository.updateStoreRepository(id, store);
};
exports.updateStoreService = updateStoreService;
const deleteStoreService = async (id) => {
    return await storeRepository.deleteStoreRepository(id);
};
exports.deleteStoreService = deleteStoreService;
const fetchStoreWithProducts = async (domain) => {
    const store = await storeRepository.getStoreByDomain(domain);
    if (!store)
        throw new Error('Store not found');
    return store;
};
exports.fetchStoreWithProducts = fetchStoreWithProducts;
const getStoreDomainByUserId = async (userId) => {
    return await storeRepository.getStoreDomainByUserIdRepo(userId);
};
exports.getStoreDomainByUserId = getStoreDomainByUserId;
const getStoreLogoByDomain = async (domain) => {
    return await storeRepository.getStoreLogoByDomainRepo(domain);
};
exports.getStoreLogoByDomain = getStoreLogoByDomain;
