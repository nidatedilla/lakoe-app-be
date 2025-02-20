import { Request, Response } from 'express';
import { getSelectedCouriers } from '../repositories/courier.repository';
import {
  createNewOrder,
  getCourierRates,
  getOrderByIdService,
  getOrdersByStore,
  getTotalOrdersTodayByStore,
  getTotalRevenueByStore,
} from '../services/order.service';
import prisma from '../utils/prisma';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, midtransTransaction } = await createNewOrder(req.body);

    const paymentStatus = midtransTransaction?.status || 'pending';

    res.status(201).json({
      success: true,
      data: order,
      payment_status: paymentStatus,
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

export const fetchCourierRates = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { store_id, destination_area_id, items } = req.body;

    if (!store_id || !destination_area_id || !items || items.length === 0) {
      res
        .status(400)
        .json({ message: 'Missing required fields or items are empty' });
      return;
    }

    const selectedCouriers = await getSelectedCouriers();
    if (!selectedCouriers.length) {
      res.status(404).json({ message: 'No selected couriers found' });
      return;
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

    const responseData = await getCourierRates(
      store_id,
      destination_area_id,
      formattedItems,
      courierCodes,
    );

    console.log(
      'Biteship API Response:',
      JSON.stringify(responseData, null, 2),
    );

    const formattedRates = responseData.pricing
      .map((courier: any) => {
        console.log('Pricing from Biteship:', responseData.pricing);
        console.log('Courier from Biteship:', courier);
        console.log('Matching selected couriers:', selectedCouriers);

        const selectedCourier = selectedCouriers.find(
          (selected) =>
            selected.courier_code === courier.courier_code &&
            selected.courier_service_code === courier.courier_service_code,
        );

        console.log('Selected Courier:', selectedCourier);

        if (!selectedCourier) {
          return null;
        }

        return {
          courier_id: selectedCourier.id,
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
        };
      })
      .filter(Boolean);

    res.json(formattedRates);
  } catch (error) {
    console.error('Error fetching courier rates:', error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.orders.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTotalRevenueByStoreHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      return res
        .status(401)
        .json({ error: 'Unauthorized, please login first' });
    }

    const totalRevenue = await getTotalRevenueByStore(userId);
    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch total revenue' });
  }
};

export const getTotalOrdersTodayByStoreHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized, store not found' });
    }

    const totalOrdersToday = await getTotalOrdersTodayByStore(userId);
    res.json({ totalOrdersToday });
  } catch (error) {
    console.error('Error fetching total orders today:', error);
    res.status(500).json({ error: 'Failed to fetch total orders today' });
  }
};
