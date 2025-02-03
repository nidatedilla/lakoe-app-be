import { Router } from 'express';
import * as userController from '../../controllers/user.controller';
import upload from '../../middlewares/upload-file';

const userRouter: Router = Router();

userRouter.get('/', userController.getUsersController);
userRouter.delete('/delete', userController.deleteUserController);
userRouter.patch('/update', userController.updateUserController);
userRouter.patch(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  userController.updateStoreSellerController,
);

export default userRouter;
