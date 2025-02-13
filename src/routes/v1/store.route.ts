import * as storeController from '../../controllers/store.controller';
import { Router } from 'express';
import { auth } from '../../middlewares/auth.middlewere';

const storeRouter = Router();

storeRouter.get('/', auth, storeController.getStoreController);
storeRouter.patch('/update', auth, storeController.updateStoreController);
storeRouter.delete('/delete', auth, storeController.deleteStoreController);
storeRouter.get('/:domain', storeController.getStoreWithProducts);

export default storeRouter;
