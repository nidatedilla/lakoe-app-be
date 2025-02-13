import {
  createGuestUser,
  createOrder,
  findStoreByUserId,
  getOrderById,
  getOrdersByStoreId,
  updateOrderWithTracking,
} from '../repositories/order.repository';
import { createBiteshipOrder } from './biteship.service';

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
