import { Router } from "express";
import * as locationController from '../../controllers/location.controller';

const locationRouter = Router();

locationRouter.get("/", locationController.getAllLocationController);
locationRouter.get("/:id", locationController.getUniqueLocationController);
locationRouter.post("/", locationController.createLocationController);
locationRouter.patch("/:id", locationController.updateLocationController);
locationRouter.delete("/:id", locationController.deleteLocationController);


export default locationRouter;