import { Router } from "express";
import * as productCOntroller from "../../controllers/product.controller";

const productRouter: Router = Router();

productRouter.get("/", productCOntroller.getUsersController);


export default productRouter;
