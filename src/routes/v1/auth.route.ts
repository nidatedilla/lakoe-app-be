import { Router } from "express";
import * as authController from "../../controllers/auth.controller"
import { auth } from "../../middlewares/auth.middlewere";


const authRouter = Router();

authRouter.post("/register", authController.register)

authRouter.post("/login", authController.login)

authRouter.post("/register/admin", authController.registerAdmin)

authRouter.get("/me",auth, authController.getMeCOntroller)

export default authRouter