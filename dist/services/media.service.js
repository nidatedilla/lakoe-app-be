"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
const uploadToCloudinary = async (file) => {
    const base64 = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${base64}`;
    const cloudinaryResponse = await cloudinary_1.default.uploader.upload(dataURI, {
        folder: 'Lakoe',
    });
    return cloudinaryResponse.secure_url;
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (url) => {
    await cloudinary_1.default.uploader.destroy(url);
};
exports.deleteFromCloudinary = deleteFromCloudinary;
