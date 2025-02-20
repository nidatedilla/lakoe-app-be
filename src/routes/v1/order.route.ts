import { Router } from 'express';
import {
  biteshipWebhook,
  midtransWebhook,
} from '../../controllers/order.webhook';
import {
  createOrder,
  fetchCourierRates,
  getOrder,
  getOrderById,
  getStoreOrders,
} from '../../controllers/order.controller';
import { auth } from '../../middlewares/auth.middlewere';
import { createBiteshipOrder } from '../../services/biteship.service';

const orderRouter = Router();

orderRouter.get('/', auth, getStoreOrders);
orderRouter.get('/:orderId', auth, getOrder);
orderRouter.get('/tracking/:orderId', getOrderById);
orderRouter.post('/create', createOrder);
orderRouter.post('/webhook', biteshipWebhook);
orderRouter.post('/couriers/rates', fetchCourierRates);
orderRouter.post('/webhook-midtrans', midtransWebhook);
orderRouter.post('/create-biteship', createBiteshipOrder);

export default orderRouter;
