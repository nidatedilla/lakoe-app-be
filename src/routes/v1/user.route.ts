import { Router } from "express";
import * as userController from "../../controllers/user.controller";

const userRouter: Router = Router();

/**
 * @swagger
 * /api/users:
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
 *                 example: aan
 *               email:
 *                 type: string
 *                 example: mail@email.com
 *               password:
 *                 type: string
 *                 example: mamamia123
 *               phone:
 *                 type: number
 *                 example: 09283712
 */
userRouter.get("/", userController.getUsersController);

export default userRouter;
