import { getProductReposytory } from '../repositories/product.repository';
import { Request, Response } from 'express';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const getAllProduct = await getProductReposytory();

    res.status(200).json(getAllProduct);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};
