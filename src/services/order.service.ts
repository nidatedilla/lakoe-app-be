import axios from 'axios';
import {
  createGuestUser,
  createOrder,
  findStoreByUserId,
  getOrderById,
  getOrdersByStoreId,
  getSellerAreaId,
  updateOrderWithTracking,
} from '../repositories/order.repository';
import { createBiteshipOrder } from './biteship.service';
import { BITESHIP_API_KEY, BITESHIP_BASE_URL } from '../config/biteship';
import { createMidtransTransaction } from '../controllers/transaction.controller';
import prisma from '../utils/prisma';

export const createNewOrder = async (orderData: any) => {
  let userId = orderData.userId;

  if (!userId) {
    const guestUser = await createGuestUser(orderData.destination_contact_name);
    userId = guestUser.id;
  }

  const order = await createOrder(orderData, userId);

  const updatedOrderData = {
    ...orderData,
    order_items: order.order_items.map((item: any) => ({
      ...item,
      product: {
        ...item.product,
        categories: item.product.categories,
      },
    })),
  };
 
  const biteshipResponse = await createBiteshipOrder(updatedOrderData);

  await updateOrderWithTracking(order.id, biteshipResponse.id);

  return { order, biteshipResponse };
};

export const getOrdersByStore = async (storeId: string) => {
  if (!storeId) {
    throw new Error('Store ID is required');
  }
  return await getOrdersByStoreId(storeId);
};

export const getOrderByIdService = async (userId: string, orderId: string) => {
  const store = await findStoreByUserId(userId);

  if (!store) {
    throw new Error('Store not found for user');
  }

  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.storeId !== store.id) {
    throw new Error('Unauthorized: You do not have access to this order');
  }

  return order;
};

export const getCourierRates = async (
  storeId: string,
  destinationAreaId: string,
  items: any,
  couriers: string,
) => {
  const location = await getSellerAreaId(storeId);
  if (!location || !location.area_id) {
    throw new Error('Store location not found');
  }

  const response = await axios.post(
    `${BITESHIP_BASE_URL}/v1/rates/couriers`,
    {
      origin_area_id: location.area_id,
      destination_area_id: destinationAreaId,
      couriers: couriers,
      items: items,
    },
    {
      headers: {
        Authorization: `Bearer ${BITESHIP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};

export const getTotalRevenueByStore = async (
  userId: string,
): Promise<number> => {
  const store = await prisma.stores.findFirst({
    where: { userId },
    select: { id: true },
  });

  if (!store) {
    throw new Error('User does not own any store');
  }

  const totalRevenue = await prisma.orders.aggregate({
    _sum: {
      total_price: true,
    },
    where: {
      status: 'Pesanan Selesai',
      storeId: store.id,
    },
  });

  const revenue = totalRevenue._sum.total_price || 0;

  await prisma.users.update({
    where: { id: userId },
    data: {
      balance: revenue
    }
  });

  return revenue;
};

export const getTotalOrdersTodayByStore = async (
  userId: string,
): Promise<number> => {
  const store = await prisma.stores.findFirst({
    where: { userId },
    select: { id: true },
  });

  if (!store) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const totalOrdersToday = await prisma.orders.count({
    where: {
      storeId: store.id,
      status: 'Pesanan Selesai',
      created_at: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  return totalOrdersToday;
};
