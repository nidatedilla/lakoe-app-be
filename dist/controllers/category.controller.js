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
exports.deleteCategoryController = exports.updateCategoryController = exports.createCategoryController = exports.getCategoryByIdController = exports.getCategoryController = void 0;
const categoryService = __importStar(require("../services/category.service"));
const getCategoryController = async (req, res) => {
    try {
        const getAllCategories = await categoryService.getAllCategoriesService();
        res.status(200).json(getAllCategories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getCategoryController = getCategoryController;
const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryByIdService(id);
        res.status(200).json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getCategoryByIdController = getCategoryByIdController;
const createCategoryController = async (req, res) => {
    try {
        const { name, parentId } = req.body;
        const category = { name, parentId };
        const newCategory = await categoryService.createCategoryService(category);
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createCategoryController = createCategoryController;
const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, parentId } = req.body;
        const category = { name, parentId };
        const updatedCategory = await categoryService.updateCategoryService(id, category);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryService.deleteCategoryService(id);
        res.status(204).json({ message: 'Category deleted successfully', deleteCategory });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteCategoryController = deleteCategoryController;
