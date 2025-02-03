import { Router } from 'express';
import {
  createProductController,
  getProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  getProductsByIsActiveController,
} from '../../controllers/product.controller';
import upload from '../../middlewares/upload-file';

const productRouter: Router = Router();

productRouter.get('/', getProductController);
productRouter.get('/:id', getProductByIdController);
productRouter.post('/',upload.single('attachments'), createProductController);
productRouter.put('/:id', updateProductController);
productRouter.get('/status/:isActive', getProductsByIsActiveController);
productRouter.delete('/:id', deleteProductController);

export default productRouter;