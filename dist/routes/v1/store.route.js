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
const storeController = __importStar(require("../../controllers/store.controller"));
const express_1 = require("express");
const auth_middlewere_1 = require("../../middlewares/auth.middlewere");
const product_controller_1 = require("../../controllers/product.controller");
const storeRouter = (0, express_1.Router)();
storeRouter.get('/', auth_middlewere_1.auth, storeController.getStoreController);
storeRouter.patch('/update', auth_middlewere_1.auth, storeController.updateStoreController);
storeRouter.delete('/delete', auth_middlewere_1.auth, storeController.deleteStoreController);
storeRouter.get('/domain', auth_middlewere_1.auth, storeController.getStoreDomain);
storeRouter.get('/:domain', storeController.getStoreWithProducts);
storeRouter.get('/product/:id', product_controller_1.getProductByIdController);
exports.default = storeRouter;
