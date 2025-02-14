import * as storeController from '../../controllers/store.controller';
import { Router } from 'express';
import { auth } from '../../middlewares/auth.middlewere';
import { getProductByIdController } from '../../controllers/product.controller';

const storeRouter = Router();

storeRouter.get('/', auth, storeController.getStoreController);
storeRouter.patch('/update', auth, storeController.updateStoreController);
storeRouter.delete('/delete', auth, storeController.deleteStoreController);
storeRouter.get('/domain', auth, storeController.getStoreDomain);
storeRouter.get('/:domain', storeController.getStoreWithProducts);
storeRouter.get('/product/:id', getProductByIdController);

export default storeRouter;
