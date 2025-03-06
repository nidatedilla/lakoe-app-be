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
exports.updateVariantController = exports.getVariantsByProductIdController = exports.getProductsByIsActiveController = exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductByIdController = exports.getProductController = void 0;
const productService = __importStar(require("../services/product.service"));
const user_repository_1 = require("../repositories/user.repository");
const getProductController = async (req, res) => {
    try {
        const userId = res.locals.user.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const userProducts = await productService.getAllProductsService(userId);
        res.status(200).json(userProducts);
    }
    catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductByIdController = getProductByIdController;
const createProductController = async (req, res) => {
    const userId = res.locals.user.id;
    try {
        let { name, description, minimum_order, url, stock, price, weight, attachments, // Dikirim sebagai JSON string (array foto)
        categoryId, sku, variant, length, // Dimensi produk
        width, height, } = req.body;
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
        // Parsing data variant (bisa berupa string JSON atau objek)
        let variantData = [];
        if (variant) {
            if (typeof variant === 'string') {
                variantData = JSON.parse(variant);
            }
            else {
                variantData = variant;
            }
        }
        const transformedVariantData = variantData.map((v) => ({
            combination: v.combination,
            price: parseInt(v.price, 10),
            sku: v.sku,
            stock: parseInt(v.stock, 10),
            weight: parseInt(v.weight, 10),
            photo: v.photo,
        }));
        // Gabungkan dimensi produk ke dalam objek JSON untuk field "size"
        const sizeJson = JSON.stringify({
            length: parseInt(length, 10),
            width: parseInt(width, 10),
            height: parseInt(height, 10),
        });
        // Parsing attachments jika ada
        const attachmentsParsed = attachments ? JSON.parse(attachments) : null;
        // Buat object product
        const product = {
            name,
            description,
            url,
            size: sizeJson,
            minimum_order: parseInt(minimum_order, 10),
            attachments: attachmentsParsed,
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
        console.error(error);
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
        console.error(error);
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
            .json({ message: 'Product deleted successfully', deleteProduct });
    }
    catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductsByIsActiveController = getProductsByIsActiveController;
const getVariantsByProductIdController = async (req, res) => {
    try {
        const { productId } = req.params; // pastikan parameter route dinamakan productId
        const variants = await productService.getVariantsByProductIdService(productId);
        res.status(200).json(variants);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
exports.getVariantsByProductIdController = getVariantsByProductIdController;
const updateVariantController = async (req, res) => {
    try {
        const { productId, variantId } = req.params;
        const { price, stock } = req.body;
        const updatedVariant = await productService.updateVariantService(productId, variantId, { price, stock });
        res.status(200).json(updatedVariant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
exports.updateVariantController = updateVariantController;
