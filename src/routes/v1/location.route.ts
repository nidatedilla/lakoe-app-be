import { Router } from 'express';
import * as locationController from '../../controllers/location.controller';
import { auth } from "../../middlewares/auth.middlewere";

const locationRouter = Router();

locationRouter.get("/", locationController.getAllLocationController);
locationRouter.get("/:id", locationController.getUniqueLocationController);
locationRouter.post("/", locationController.createLocationController);
locationRouter.patch("/:id", locationController.updateLocationController);
locationRouter.delete("/:id", locationController.deleteLocationController);
locationRouter.post("/user", locationController.createBuyerLocation);
locationRouter.get("/guest-locations/:guestId", locationController.getGuestLocation);
locationRouter.patch("/main-location/:id", auth,locationController.updateIsMainLocation)

export default locationRouter;
