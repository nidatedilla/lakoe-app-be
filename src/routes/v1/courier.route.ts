import { Router } from 'express';
import {
  getAllCouriers,
  getSelectedCouriers,
  toggleCourierSelections,
} from '../../controllers/courier.controller';

const courierRouter = Router();

courierRouter.get('/', getAllCouriers);
courierRouter.patch('/:courierId', toggleCourierSelections);
courierRouter.get('/selected', getSelectedCouriers);

export default courierRouter;
