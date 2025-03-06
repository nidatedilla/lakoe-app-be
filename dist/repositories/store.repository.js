"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreLogoByDomainRepo = exports.getStoreDomainByUserIdRepo = exports.getStoreByDomain = exports.findUniqueStoreLocationRepository = exports.findUniqueStoreByIdRepository = exports.uniqueStoreByName = exports.deleteStoreRepository = exports.updateStoreRepository = exports.findUniqueStoreRepository = exports.getStoreRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getStoreRepository = async () => {
    return await prisma_1.default.stores.findMany({
        include: {
            user: true,
        },
    });
};
exports.getStoreRepository = getStoreRepository;
const findUniqueStoreRepository = async (userId) => {
    return await prisma_1.default.stores.findUnique({
        where: { userId },
    });
};
exports.findUniqueStoreRepository = findUniqueStoreRepository;
const updateStoreRepository = async (id, store) => {
    return await prisma_1.default.stores.update({
        where: { id },
        data: {
            name: store.name,
            description: store.description,
            banner: store.banner,
            userId: store.userId,
        },
    });
};
exports.updateStoreRepository = updateStoreRepository;
const deleteStoreRepository = async (id) => {
    return await prisma_1.default.stores.delete({
        where: {
            id,
        },
    });
};
exports.deleteStoreRepository = deleteStoreRepository;
const uniqueStoreByName = async (name) => {
    return await prisma_1.default.stores.findUnique({
        where: {
            name,
        },
    });
};
exports.uniqueStoreByName = uniqueStoreByName;
const findUniqueStoreByIdRepository = async (id) => {
    return await prisma_1.default.stores.findUnique({
        where: { id },
    });
};
exports.findUniqueStoreByIdRepository = findUniqueStoreByIdRepository;
const findUniqueStoreLocationRepository = async (id) => {
    return await prisma_1.default.stores.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            locations: true,
        },
    });
};
exports.findUniqueStoreLocationRepository = findUniqueStoreLocationRepository;
const getStoreByDomain = async (domain) => {
    return await prisma_1.default.stores.findUnique({
        where: { domain },
        include: {
            products: { include: { variant: true } },
            user: true,
            locations: true,
        },
    });
};
exports.getStoreByDomain = getStoreByDomain;
const getStoreDomainByUserIdRepo = async (userId) => {
    return prisma_1.default.stores.findUnique({
        where: { userId },
        select: { domain: true },
    });
};
exports.getStoreDomainByUserIdRepo = getStoreDomainByUserIdRepo;
const getStoreLogoByDomainRepo = async (domain) => {
    return prisma_1.default.stores.findUnique({
        where: { domain },
        select: { logo: true },
    });
};
exports.getStoreLogoByDomainRepo = getStoreLogoByDomainRepo;
