"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = generateOrderNumber;
function generateOrderNumber() {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/[-T:\.Z]/g, '');
    return `ORD-${formattedDate}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}
