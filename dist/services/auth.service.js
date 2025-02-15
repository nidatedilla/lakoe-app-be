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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerAdmin = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = __importStar(require("../repositories/user.repository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (user) => {
    console.log('Registering user:', user);
    const existedEmail = await userRepository.findUniqueUserByEmailRepository(user.email);
    if (existedEmail) {
        throw new Error('Email already used');
    }
    console.log('Existed email:', existedEmail);
    user.password = await bcrypt_1.default.hash(user.password, 10);
    const existedPhoneNum = await userRepository.findUniqueUserByPhoneNumberRepository(user.phone);
    if (existedPhoneNum) {
        throw new Error('phone number already used');
    }
    console.log('Existed phone number:', existedPhoneNum);
    const registeredUser = await userRepository.registerUserRepository(user);
    console.log(registeredUser);
    return registeredUser;
};
exports.registerUser = registerUser;
const registerAdmin = async (user) => {
    console.log('Registering admin:', user);
    const existedEmail = await userRepository.findUniqueUserByEmailRepository(user.email);
    if (existedEmail) {
        throw new Error('Email already used');
    }
    console.log('Existed email:', existedEmail);
    user.password = await bcrypt_1.default.hash(user.password, 10);
    const existedPhoneNum = await userRepository.findUniqueUserByPhoneNumberRepository(user.phone);
    if (existedPhoneNum) {
        throw new Error('phone number already used');
    }
    console.log('Existed phone number:', existedPhoneNum);
    const registeredUser = await userRepository.registerAdminRepository(user);
    console.log(registeredUser);
    return registeredUser;
};
exports.registerAdmin = registerAdmin;
const loginUser = async (LoginDTO) => {
    const { email, password } = LoginDTO;
    const user = await userRepository.findUniqueUserByEmailRepository(email);
    if (!user) {
        throw new Error('Email or password is incorrect');
    }
    ;
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('password is incorrect');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    };
};
exports.loginUser = loginUser;
