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
exports.getProductsByIsActiveService = exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.getProductByIdService = exports.getAllProductsService = void 0;
const productRepository = __importStar(require("../repositories/product.repository"));
const media_service_1 = require("./media.service");
const getAllProductsService = async () => {
    return await productRepository.findAllProductRepository();
};
exports.getAllProductsService = getAllProductsService;
const getProductByIdService = async (id) => {
    return await productRepository.findUniqueProductRepository(id);
};
exports.getProductByIdService = getProductByIdService;
const createProductService = async (product, categoryId, file) => {
    if (file) {
        const mediaUrl = await (0, media_service_1.uploadToCloudinary)(file);
        product.attachments = mediaUrl;
    }
    return await productRepository.createProductRepository(product, categoryId);
};
exports.createProductService = createProductService;
const updateProductService = async (id, product) => {
    const updatedProductData = {
        ...product,
        // Jika property 'size' bernilai null, jadikan undefined
        size: product.size === null ? undefined : product.size,
        // Lakukan hal serupa untuk properti lain yang bermasalah jika diperlukan
    };
    return await productRepository.updateProductRepository(id, updatedProductData);
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    return await productRepository.deleteProductRepository(id);
};
exports.deleteProductService = deleteProductService;
const getProductsByIsActiveService = async (isActive) => {
    return await productRepository.findProductsByIsActive(isActive);
};
exports.getProductsByIsActiveService = getProductsByIsActiveService;
