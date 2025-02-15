"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryRepository = exports.updateCategoryRepository = exports.createCategoryRepository = exports.findUniqueCategoryRepository = exports.findAllCategoriesRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const findAllCategoriesRepository = async () => {
    return await prisma_1.default.categories.findMany();
};
exports.findAllCategoriesRepository = findAllCategoriesRepository;
const findUniqueCategoryRepository = async (id) => {
    return await prisma_1.default.categories.findUnique({
        where: { id },
    });
};
exports.findUniqueCategoryRepository = findUniqueCategoryRepository;
const createCategoryRepository = async (category) => {
    return await prisma_1.default.categories.create({
        data: category,
    });
};
exports.createCategoryRepository = createCategoryRepository;
const updateCategoryRepository = async (id, category) => {
    return await prisma_1.default.categories.update({
        where: { id },
        data: category,
    });
};
exports.updateCategoryRepository = updateCategoryRepository;
const deleteCategoryRepository = async (id) => {
    return await prisma_1.default.categories.delete({
        where: { id },
    });
};
exports.deleteCategoryRepository = deleteCategoryRepository;
