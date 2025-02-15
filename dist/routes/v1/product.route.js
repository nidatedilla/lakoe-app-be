"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controllers/product.controller");
const upload_file_1 = __importDefault(require("../../middlewares/upload-file"));
const productRouter = (0, express_1.Router)();
productRouter.get('/', product_controller_1.getProductController);
productRouter.get('/:id', product_controller_1.getProductByIdController);
productRouter.post('/', upload_file_1.default.single('attachments'), product_controller_1.createProductController);
productRouter.put('/:id', product_controller_1.updateProductController);
productRouter.get('/status/:isActive', product_controller_1.getProductsByIsActiveController);
productRouter.delete('/:id', product_controller_1.deleteProductController);
exports.default = productRouter;
