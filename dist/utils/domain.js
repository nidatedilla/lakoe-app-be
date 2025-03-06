"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueDomain = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const generateUniqueDomain = async (storeName) => {
    let baseDomain = storeName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    let domain = baseDomain;
    let count = 1;
    while (await prisma_1.default.stores.findUnique({ where: { domain } })) {
        domain = `${baseDomain}-${count}`;
        count++;
    }
    return domain;
};
exports.generateUniqueDomain = generateUniqueDomain;
