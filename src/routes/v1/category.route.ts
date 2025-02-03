import { Router } from 'express';
import {
  createCategoryController,
  getCategoryController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from '../../controllers/category.controller';

const categoryRouter: Router = Router();

categoryRouter.get('/', getCategoryController);
categoryRouter.get('/:id', getCategoryByIdController);
categoryRouter.post('/', createCategoryController);
categoryRouter.put('/:id', updateCategoryController);
categoryRouter.delete('/:id', deleteCategoryController);

export default categoryRouter;