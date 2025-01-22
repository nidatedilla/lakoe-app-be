import { Router } from "express";
import * as productCOntroller from "../../controllers/product.controller";

const productRouter: Router = Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: get users
 *     description: get users available
 *     responses:
 *       200:
 *         description: API get users
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: sepatu opera
 *               description:
 *                 type: string
 *                 example: sepatu paling keren
 *               size:
 *                 type: number
 *                 example: 31
 */
productRouter.get("/", productCOntroller.getUsersController);

export default productRouter;
