import { Router } from 'express';
import {
  createProductController,
  getProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from '../../controllers/product.controller';

const productRouter: Router = Router();

productRouter.get('/', getProductController);
productRouter.get('/:id', getProductByIdController);
productRouter.post('/', createProductController);
productRouter.put('/:id', updateProductController);
productRouter.delete('/:id', deleteProductController);

export default productRouter;