"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProductByName = exports.findProductsByIsActive = exports.deleteProductRepository = exports.updateProductRepository = exports.createProductRepository = exports.findUniqueProductRepository = exports.findAllProductRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const findAllProductRepository = async () => {
    return await prisma_1.default.products.findMany({
        include: {
            stores: true,
            categories: true,
        },
    });
};
exports.findAllProductRepository = findAllProductRepository;
const findUniqueProductRepository = async (id) => {
    return await prisma_1.default.products.findUnique({
        where: { id },
        include: {
            variant: true,
            categories: true,
        },
    });
};
exports.findUniqueProductRepository = findUniqueProductRepository;
const createProductRepository = async (product, categoryId) => {
    return await prisma_1.default.products.create({
        data: {
            ...product,
            // Jika product.size bernilai null, ganti dengan undefined
            size: product.size ?? undefined,
            // Jika categoryId tidak null atau undefined, hubungkan ke kategori
            ...(categoryId && {
                categories: {
                    create: {
                        category: {
                            connect: {
                                id: categoryId,
                            },
                        },
                    },
                },
            }),
        },
    });
};
exports.createProductRepository = createProductRepository;
const updateProductRepository = async (id, product) => {
    return await prisma_1.default.products.update({
        where: { id },
        data: product,
    });
};
exports.updateProductRepository = updateProductRepository;
const deleteProductRepository = async (id) => {
    await prisma_1.default.productCategories.deleteMany({
        where: { productId: id },
    });
    return await prisma_1.default.products.delete({
        where: { id },
    });
};
exports.deleteProductRepository = deleteProductRepository;
const findProductsByIsActive = async (isActive) => {
    return await prisma_1.default.products.findMany({
        where: { is_active: isActive },
        include: {
            stores: true,
            categories: true,
        },
    });
};
exports.findProductsByIsActive = findProductsByIsActive;
const findProductByName = async (name) => {
    return await prisma_1.default.products.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
    });
};
exports.findProductByName = findProductByName;
