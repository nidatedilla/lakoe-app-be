import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import productRouter from './product.route';
import { auth } from '../../middlewares/auth.middlewere';
import storeRouter from './store.route';
import categoryRouter from './category.route';
import aiRouter from './ai.route';
import messageRouter from './message.route';
import orderRouter from './order.route';
import courierRouter from './courier.route';
import locationRouter from './location.route';
import regionRouter from './region.route';
import areaRouter from './area.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', auth, userRouter);
router.use('/product', auth, productRouter);
router.use('/store', storeRouter);
router.use('/category', auth, categoryRouter);
router.use('/message-templates', auth, messageRouter);
router.use('/orders', orderRouter);
router.use('/couriers', courierRouter);
router.use('/location', locationRouter);
router.use('/ai', aiRouter);
router.use('/wilayah', regionRouter);
router.use('/areas', areaRouter);

export default router;
