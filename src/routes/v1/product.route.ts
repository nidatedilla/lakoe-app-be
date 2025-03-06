import { Router } from 'express';
import {
  createProductController,
  getProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  getProductsByIsActiveController,
  getVariantsByProductIdController,
  updateVariantController,
} from '../../controllers/product.controller';
import upload from '../../middlewares/upload-file';

const productRouter: Router = Router();

productRouter.get('/', getProductController);
productRouter.get('/:id', getProductByIdController);
productRouter.post('/', upload.single('attachments'), createProductController);
productRouter.put('/:id', updateProductController);
productRouter.get('/status/:isActive', getProductsByIsActiveController);
productRouter.delete('/:id', deleteProductController);
// Endpoint baru untuk variant berdasarkan product
productRouter.get('/:productId/variants', getVariantsByProductIdController);
productRouter.put('/:productId/variants/:variantId', updateVariantController);
export default productRouter;
