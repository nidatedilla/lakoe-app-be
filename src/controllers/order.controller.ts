import { Request, Response } from 'express';
import {
  createNewOrder,
  getOrderByIdService,
  getOrdersByStore,
} from '../services/order.service';
import prisma from '../utils/prisma';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await createNewOrder(req.body);

    res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStoreOrders = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User not found' });
      return;
    }

    const store = await prisma.stores.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!store) {
      res.status(404).json({ message: 'Store not found for this user' });
      return;
    }

    const orders = await getOrdersByStore(store.id);

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong';
    res.status(500).json({ message: errorMessage });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const userId = res.locals.user.id;

  try {
    const order = await getOrderByIdService(userId, orderId);
    res.status(200).json(order);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong';
    res.status(403).json({ message: errorMessage });
  }
};
