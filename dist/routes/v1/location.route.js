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
const locationController = __importStar(require("../../controllers/location.controller"));
const auth_middlewere_1 = require("../../middlewares/auth.middlewere");
const locationRouter = (0, express_1.Router)();
locationRouter.get("/", locationController.getAllLocationController);
locationRouter.get("/:id", locationController.getUniqueLocationController);
locationRouter.post("/", locationController.createLocationController);
locationRouter.patch("/:id", locationController.updateLocationController);
locationRouter.delete("/:id", locationController.deleteLocationController);
locationRouter.post("/user", locationController.createBuyerLocation);
locationRouter.get("/guest-locations/:guestId", locationController.getGuestLocation);
locationRouter.patch("/main-location/:id", auth_middlewere_1.auth, locationController.updateIsMainLocation);
exports.default = locationRouter;
