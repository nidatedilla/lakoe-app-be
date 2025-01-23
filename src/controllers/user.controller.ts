import { getUsersRepository } from '../repositories/user.repository';
import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const getAllUser = await getUsersRepository();

    res.status(200).json(getAllUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = res.locals.user.id;

  if (!id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const userId = id

    const deleteUser = await userService.deleteUserService(userId);

    res.status(201).json({message: "User deleted",deleteUser});

    return;
  } catch (error) {
    
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
   
  }
};