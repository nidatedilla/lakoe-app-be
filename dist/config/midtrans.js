"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const midtrans_node_client_1 = require("midtrans-node-client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const snap = new midtrans_node_client_1.MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});
exports.default = snap;
