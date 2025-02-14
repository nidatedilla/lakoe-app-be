import { Router } from 'express';
import {
  getAllCouriers,
  getCourierRates,
  getSelectedCouriers,
  toggleCourierSelections,
} from '../../controllers/courier.controller';

const courierRouter = Router();

courierRouter.get('/', getAllCouriers);
courierRouter.patch('/:courierId', toggleCourierSelections);
courierRouter.get('/selected', getSelectedCouriers);
courierRouter.get('/rates', getCourierRates);

export default courierRouter;
