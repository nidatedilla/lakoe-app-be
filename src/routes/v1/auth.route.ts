import { Router } from "express";
import * as authController from "../../controllers/auth.controller"


const authRouter = Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: add new users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
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
 *     responses:
 *       201:
 *         description: user add successfully
 */
authRouter.post("/register", authController.register)

authRouter.post("/login", authController.login)

export default authRouter