import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import productRouter from './product.route';
import { auth } from '../../middlewares/auth.middlewere';
import storeRouter from './store.route';
import categoryRouter from './category.route';
import aiRouter from './ai.route';
import messageRouter from './message.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', auth, userRouter);
router.use('/product', auth, productRouter);
router.use('/store', auth, storeRouter);
router.use('/category', auth, categoryRouter);
router.use('/message-templates', auth, messageRouter);
router.use('/ai', aiRouter);

export default router;
