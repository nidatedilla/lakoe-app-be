import * as storeController from '../../controllers/store.controller'
import { Router } from 'express';


const storeRouter = Router();

storeRouter.get('/', storeController.getStoreController)
storeRouter.patch('/update', storeController.updateStoreController)
storeRouter.delete('/delete', storeController.deleteStoreController)

export default storeRouter;