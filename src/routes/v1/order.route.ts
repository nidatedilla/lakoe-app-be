import { Router } from 'express';
import { biteshipWebhook } from '../../controllers/order.webhook';
import {
  createOrder,
  getOrder,
  getStoreOrders,
} from '../../controllers/order.controller';
import { auth } from '../../middlewares/auth.middlewere';

const orderRouter = Router();

orderRouter.get('/', auth, getStoreOrders);
orderRouter.get('/:orderId', auth, getOrder);
orderRouter.post('/create', createOrder);
orderRouter.post('/webhook', biteshipWebhook);

export default orderRouter;
