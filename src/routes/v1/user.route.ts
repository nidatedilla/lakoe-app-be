import { Router } from "express";
import * as userController from "../../controllers/user.controller";

const userRouter: Router = Router();

userRouter.get("/", userController.getUsersController);
userRouter.delete("/delete", userController.deleteUserController);

export default userRouter;
