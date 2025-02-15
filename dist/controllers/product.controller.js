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
exports.getProductsByIsActiveController = exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductByIdController = exports.getProductController = void 0;
const productService = __importStar(require("../services/product.service"));
const user_repository_1 = require("../repositories/user.repository");
const getProductController = async (req, res) => {
    try {
        const getAllProduct = await productService.getAllProductsService();
        res.status(200).json(getAllProduct);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductController = getProductController;
const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductByIdService(id);
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductByIdController = getProductByIdController;
const createProductController = async (req, res) => {
    const userId = res.locals.user.id;
    try {
        let { name, description, size, minimum_order, url, stock, price, weight, attachments, categoryId, sku, variant, } = req.body;
        const file = req.file;
        const findUniqueUserById = await (0, user_repository_1.getUniqueUserByIdRepository)(userId);
        if (!findUniqueUserById) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (findUniqueUserById.id !== userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const storeId = findUniqueUserById.stores?.id || '';
        // Parsing data variant yang dikirim dari frontend (bisa berupa string JSON)
        let variantData = [];
        if (variant) {
            if (typeof variant === 'string') {
                variantData = JSON.parse(variant);
            }
            else {
                variantData = variant;
            }
        }
        // Pastikan data varian hanya memiliki field yang didefinisikan di model variants.
        // Misalnya, jika ada properti "name", kita hapus atau abaikan.
        const transformedVariantData = variantData.map((v) => ({
            combination: v.combination, // Harus berupa objek atau JSON
            price: parseInt(v.price, 10),
            sku: v.sku,
            stock: parseInt(v.stock, 10),
            weight: parseInt(v.weight, 10),
            photo: v.photo,
        }));
        // Buat object product
        const product = {
            name,
            description,
            url,
            size: parseInt(size, 10),
            minimum_order: parseInt(minimum_order, 10),
            attachments,
            storeId,
            sku,
            weight: parseInt(weight, 10),
            is_active: true,
            categoryId: categoryId || null,
            stock: parseInt(stock, 10),
            price: parseInt(price, 10),
            variant: {
                create: transformedVariantData,
            },
        };
        const newProduct = await productService.createProductService(product, categoryId, file);
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createProductController = createProductController;
const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, description, size, url, weight, minimum_order, attachments, storeId, is_active, sku, categoryId, stock, price, } = req.body;
        const product = {
            name,
            description,
            size,
            url,
            weight,
            minimum_order,
            attachments,
            storeId,
            is_active,
            categoryId,
            stock,
            sku,
            price,
        };
        const updatedProduct = await productService.updateProductService(id, product);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await productService.deleteProductService(id);
        res
            .status(204)
            .json({ message: 'product deleted successfully', deleteProduct });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteProductController = deleteProductController;
const getProductsByIsActiveController = async (req, res) => {
    try {
        const { isActive } = req.params;
        const products = await productService.getProductsByIsActiveService(isActive === 'true');
        res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductsByIsActiveController = getProductsByIsActiveController;
