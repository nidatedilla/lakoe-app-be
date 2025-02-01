import { Router } from "express";
import * as aiController from '../../controllers/ai.controller'

const aiRouter = Router();

aiRouter.post('/', aiController.getAiResponse)

export default aiRouter