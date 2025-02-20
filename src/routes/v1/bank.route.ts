import { Router } from "express";
import * as bankController from "../../controllers/bank.controller";

const bankRouter = Router();

bankRouter.post("/", bankController.createBank);
bankRouter.get("/all", bankController.findAllBank);
bankRouter.get("/:id", bankController.findBankById);
bankRouter.delete("/:id", bankController.deleteBank);

export default bankRouter;