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
exports.updateStoreSellerController = exports.updateUserController = exports.deleteUserController = exports.getUsersController = void 0;
const user_repository_1 = require("../repositories/user.repository");
const userService = __importStar(require("../services/user.service"));
const store_repository_1 = require("../repositories/store.repository");
const getUsersController = async (req, res) => {
    try {
        const getAllUser = await (0, user_repository_1.getUsersRepository)();
        res.status(200).json(getAllUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getUsersController = getUsersController;
const deleteUserController = async (req, res) => {
    const id = res.locals.user.id;
    if (!id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const userId = id;
        const deleteUser = await userService.deleteUserService(userId);
        res.status(201).json({ message: 'User deleted', deleteUser });
        return;
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUserController = deleteUserController;
const updateUserController = async (req, res) => {
    const userId = res.locals.user.id;
    const { body } = req;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const updateUser = await userService.updateUserService(body);
        res.status(201).json(updateUser);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateUserController = updateUserController;
const client_1 = require("@prisma/client");
const updateStoreSellerController = async (req, res) => {
    const id = res.locals.user.id;
    if (!id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const { name, description, banner, logo, slogan } = req.body;
        const stores = {
            name,
            description,
            banner,
            logo,
            slogan,
            userId: id,
        };
        if (name) {
            const existingStore = await (0, store_repository_1.findUniqueStoreByIdRepository)(id);
            if (existingStore && existingStore.name !== name) {
                const storeName = await (0, store_repository_1.uniqueStoreByName)(name);
                if (storeName) {
                    res.status(400).json({ message: "Store name already exists" });
                    return;
                }
            }
        }
        const files = req.files;
        const logoFile = files.logo?.[0];
        const bannerFile = files.banner?.[0];
        const updateStoreSeller = await userService.updateStoreSellerService({ id, stores }, { logo: logoFile, banner: bannerFile });
        res.status(200).json(updateStoreSeller);
    }
    catch (error) {
        console.log("Error:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                res.status(400).json({ message: "Store name already exists" });
                return;
            }
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateStoreSellerController = updateStoreSellerController;
