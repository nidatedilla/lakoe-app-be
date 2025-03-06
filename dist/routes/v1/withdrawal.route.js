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
const express_1 = require("express");
const reqPaymentController = __importStar(require("../../controllers/withdrawal.controller"));
const reqPaymentRouter = (0, express_1.Router)();
reqPaymentRouter.post("/", reqPaymentController.createReqPaymentController);
reqPaymentRouter.get("/pending", reqPaymentController.findPendingReqPaymentController);
reqPaymentRouter.get("/processing", reqPaymentController.findProcessingReqPaymentController);
reqPaymentRouter.get("/success", reqPaymentController.findSuccessReqPaymentController);
reqPaymentRouter.get("/rejected", reqPaymentController.findRejectedReqPaymentController);
reqPaymentRouter.patch("/processing/:id", reqPaymentController.updateStatusToProcessingReqPaymentController);
reqPaymentRouter.patch("/rejected/:id", reqPaymentController.updateStatusToRejectedReqPaymentController);
reqPaymentRouter.patch("/success/:id", reqPaymentController.updateStatusToSuccessReqPaymentController);
reqPaymentRouter.get('/search-pending', reqPaymentController.searchPendingReqPaymentsController);
reqPaymentRouter.get('/search-processing', reqPaymentController.searchProcessingReqPaymentsController);
reqPaymentRouter.get('/search-success', reqPaymentController.searchSuccessReqPaymentsController);
reqPaymentRouter.get('/search-rejected', reqPaymentController.searchRejectedReqPaymentsController);
reqPaymentRouter.get("/user/:userId", reqPaymentController.getUserWithdrawalsController);
exports.default = reqPaymentRouter;
