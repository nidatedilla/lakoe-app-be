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
exports.getMeCOntroller = exports.login = exports.registerAdmin = exports.register = void 0;
const authServices = __importStar(require("../services/auth.service"));
const user_repository_1 = require("../repositories/user.repository");
const register = async (req, res) => {
    try {
        const { body } = req;
        const user = await authServices.registerUser(body);
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.register = register;
const registerAdmin = async (req, res) => {
    try {
        const { body } = req;
        const admin = await authServices.registerAdmin(body);
        res.status(201).json(admin);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.registerAdmin = registerAdmin;
const login = async (req, res) => {
    const { body } = req;
    try {
        const user = await authServices.loginUser(body);
        console.log('user id: ', user.user.id);
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.login = login;
const getMeCOntroller = async (req, res) => {
    const user = res.locals.user;
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const me = await (0, user_repository_1.getMeRepository)(user.id);
        res.status(200).json(me);
    }
    catch (error) { }
};
exports.getMeCOntroller = getMeCOntroller;
