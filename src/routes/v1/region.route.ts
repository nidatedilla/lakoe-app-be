import { Router } from "express";
import * as regionController from '../../controllers/region.controller';

const regionRouter = Router();

regionRouter.get('/provinces', regionController.getProvinces)
regionRouter.get('/regencies/:provinceCode', regionController.getRegencies)
regionRouter.get('/districts/:regencieCode', regionController.getDistricts)
regionRouter.get('/villages/:districtsCode', regionController.getVillages)


export default regionRouter;