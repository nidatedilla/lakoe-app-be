import { Request, Response } from 'express';
import {
  createNewOrder,
  getCourierRates,
  getOrderByIdService,
  getOrdersByStore,
} from '../services/order.service';
import prisma from '../utils/prisma';
import { getSelectedCouriers } from '../repositories/courier.repository';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, midtransTransaction } = await createNewOrder(req.body);

    res.status(201).json({
      success: true,
      data: order,
      midtrans_token:
        midtransTransaction && 'token' in midtransTransaction
          ? midtransTransaction.token
          : null,
      redirect_url:
        midtransTransaction && 'redirect_url' in midtransTransaction
          ? midtransTransaction.redirect_url
          : null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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

export const fetchCourierRates = async (req: Request, res: Response) => {
  try {
    const { store_id, destination_area_id, items } = req.body;

    if (!store_id || !destination_area_id || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: 'Missing required fields or items are empty' });
    }

    const selectedCouriers = await getSelectedCouriers();
    if (!selectedCouriers.length) {
      return res.status(404).json({ message: 'No selected couriers found' });
    }

    const courierCodes = [
      ...new Set(selectedCouriers.map((courier) => courier.courier_code)),
    ].join(',');
    console.log('Courier codes sent to Biteship:', courierCodes);

    const formattedItems = items.map((item: any) => ({
      name: item.name || 'Unknown',
      description: item.description || 'No description',
      value: item.value || 0,
      weight: item.weight || 0,
      quantity: item.quantity || 1,
    }));

    const response = await getCourierRates(
      store_id,
      destination_area_id,
      formattedItems,
      courierCodes,
    );
    console.log('Biteship API Response:', JSON.stringify(response, null, 2));

    const formattedRates = response.pricing.map((courier: any) => ({
      courier_name: courier.courier_name,
      courier_code: courier.courier_code,
      shipping_type: courier.shipping_type,
      service_code: courier.courier_service_code,
      service_name: courier.courier_service_name,
      description: courier.description,
      shipment_duration_range: courier.shipment_duration_range,
      shipment_duration_unit: courier.shipment_duration_unit,
      duration: courier.duration,
      price: courier.price,
    }));

    return res.json(formattedRates);
  } catch (error) {
    console.error('Error fetching courier rates:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
};
