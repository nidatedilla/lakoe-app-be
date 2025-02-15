"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeRepository = exports.getUniqueUserByIdRepository = exports.findUniqueUserByIdRepository = exports.deleteUserRepository = exports.findUniqueUserByPhoneNumberRepository = exports.findUniqueUserByEmailRepository = exports.updateUserRepository = exports.registerAdminRepository = exports.updateStoreSellerRepository = exports.registerUserRepository = exports.getUsersRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const domain_1 = require("../utils/domain");
const getUsersRepository = async () => {
    return await prisma_1.default.users.findMany({
        include: {
            stores: true,
        },
    });
};
exports.getUsersRepository = getUsersRepository;
const registerUserRepository = async (user) => {
    return await prisma_1.default.users.create({
        data: {
            email: user.email,
            password: user.password,
            name: user.name,
            phone: user.phone,
            role: user.role || 'Seller',
        },
    });
};
exports.registerUserRepository = registerUserRepository;
const updateStoreSellerRepository = async (user) => {
    const newDomain = user.stores?.name
        ? await (0, domain_1.generateUniqueDomain)(user.stores.name)
        : '';
    return await prisma_1.default.users.update({
        where: { id: user.id, role: 'Seller' },
        data: {
            stores: {
                upsert: {
                    create: {
                        name: user.stores?.name || '',
                        description: user.stores?.description || '',
                        banner: user.stores?.banner,
                        logo: user.stores?.logo,
                        slogan: user.stores?.slogan,
                        domain: newDomain,
                    },
                    update: {
                        name: user.stores?.name || '',
                        description: user.stores?.description || '',
                        banner: user.stores?.banner,
                        logo: user.stores?.logo,
                        slogan: user.stores?.slogan,
                        domain: newDomain,
                    },
                },
            },
        },
        include: {
            stores: true,
        },
    });
};
exports.updateStoreSellerRepository = updateStoreSellerRepository;
const registerAdminRepository = async (user) => {
    return await prisma_1.default.users.create({
        data: {
            email: user.email,
            password: user.password,
            name: user.name,
            phone: user.phone,
            role: 'admin',
        },
    });
};
exports.registerAdminRepository = registerAdminRepository;
const updateUserRepository = async (user) => {
    return await prisma_1.default.users.update({
        where: { id: user.id },
        data: {
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role,
        },
    });
};
exports.updateUserRepository = updateUserRepository;
const findUniqueUserByEmailRepository = async (email) => {
    if (!email) {
        throw new Error('Email is required');
    }
    return await prisma_1.default.users.findUnique({
        where: { email },
    });
};
exports.findUniqueUserByEmailRepository = findUniqueUserByEmailRepository;
const findUniqueUserByPhoneNumberRepository = async (phone) => {
    return await prisma_1.default.users.findUnique({
        where: { phone },
    });
};
exports.findUniqueUserByPhoneNumberRepository = findUniqueUserByPhoneNumberRepository;
const deleteUserRepository = async (id) => {
    return await prisma_1.default.users.delete({
        where: { id },
    });
};
exports.deleteUserRepository = deleteUserRepository;
const findUniqueUserByIdRepository = async (id) => {
    return await prisma_1.default.users.findUnique({
        where: { id },
    });
};
exports.findUniqueUserByIdRepository = findUniqueUserByIdRepository;
const getUniqueUserByIdRepository = async (id) => {
    return await prisma_1.default.users.findUnique({
        where: { id },
        include: {
            stores: true,
        },
    });
};
exports.getUniqueUserByIdRepository = getUniqueUserByIdRepository;
const getMeRepository = async (id) => {
    return await prisma_1.default.users.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            role: true,
            name: true,
            phone: true,
            profile: true,
            stores: {
                select: {
                    banner: true,
                    name: true,
                    id: true,
                    logo: true,
                    description: true,
                    domain: true,
                    slogan: true,
                    userId: true,
                    products: true,
                    locations: true,
                    _count: {
                        select: {
                            products: true,
                        },
                    },
                },
            },
        },
    });
};
exports.getMeRepository = getMeRepository;
