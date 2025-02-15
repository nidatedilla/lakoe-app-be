"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const area_controller_1 = require("../../controllers/area.controller");
const areaRouter = (0, express_1.Router)();
areaRouter.get('/search', area_controller_1.searchAreasByInput);
exports.default = areaRouter;
