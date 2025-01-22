import {getUsersRepository} from '../repositories/user.repository'
import { Request, Response } from 'express';

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const getAllUser = await getUsersRepository()

        res.status(200).json(getAllUser)
    } catch (error) {
        console.log(error);

        res.status(500).json({
          message: (error as Error).message,
        });
    }
} 