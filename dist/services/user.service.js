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
exports.getUserByIdService = exports.updateStoreSellerService = exports.updateUserService = exports.deleteUserService = void 0;
const userRepository = __importStar(require("../repositories/user.repository"));
const media_service_1 = require("./media.service");
const deleteUserService = async (id) => {
    return await userRepository.deleteUserRepository(id);
};
exports.deleteUserService = deleteUserService;
const updateUserService = async (user) => {
    return await userRepository.updateUserRepository(user);
};
exports.updateUserService = updateUserService;
const updateStoreSellerService = async (user, files) => {
    if (files?.logo) {
        const logUrl = await (0, media_service_1.uploadToCloudinary)(files.logo);
        if (user.stores) {
            user.stores.logo = logUrl;
        }
    }
    if (files?.banner) {
        const banUrl = await (0, media_service_1.uploadToCloudinary)(files.banner);
        if (user.stores) {
            user.stores.banner = banUrl;
        }
    }
    return await userRepository.updateStoreSellerRepository(user);
};
exports.updateStoreSellerService = updateStoreSellerService;
const getUserByIdService = async (id) => {
    return await userRepository.findUniqueUserByIdRepository(id);
};
exports.getUserByIdService = getUserByIdService;
