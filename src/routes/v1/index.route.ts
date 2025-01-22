import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import productRouter from "./product.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/product", productRouter);

export default router;
