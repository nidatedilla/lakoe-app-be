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
import { BITESHIP_API_KEY, BITESHIP_BASE_URL } from '../config/biteship';
import { createMidtransTransaction } from '../controllers/transaction.controller';

export const createNewOrder = async (orderData: any) => {
  let userId = orderData.userId;

  if (!userId) {
    const guestUser = await createGuestUser(orderData.destination_contact_name);
    userId = guestUser.id;
  }

  const order = await createOrder(orderData, userId);

  const midtransTransaction = await createMidtransTransaction(order);

  return { order, midtransTransaction };
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
