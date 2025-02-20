import axios from 'axios';
import { BITESHIP_API_KEY, BITESHIP_BASE_URL } from '../config/biteship';
import prisma from '../utils/prisma';

export const createBiteshipOrder = async (orderData: any) => {
  const selectedCourier = await prisma.couriers.findUnique({
    where: { id: orderData.courierId },
  });

  if (!selectedCourier) {
    throw new Error('Courier not found');
  }

  const items = await Promise.all(
    orderData.order_items.map(async (item: any) => {
      const product = item.product;
      const categories =
        product?.categories.map((cat: any) => cat.name).join(', ') || '';

      return {
        name: product?.name,
        description: product?.description,
        category: categories,
        value: product?.price,
        quantity: item.qty,
        height: item.height,
        length: item.length,
        weight: item.weight,
        width: item.width,
      };
    }),
  );

  const mainLocation = orderData.store.locations?.[0] || {};

  const payload = {
    origin_contact_name: orderData.store.user.name || '',
    origin_contact_phone: orderData.store.user.phone || '',
    origin_address: mainLocation.address || '',
    origin_postal_code: Number(mainLocation.postal_code) || null,
    destination_contact_name: orderData.destination_contact_name || '',
    destination_contact_phone: orderData.destination_contact_phone || '',
    destination_address: orderData.destination_address || '',
    destination_postal_code: Number(orderData.destination_postal_code) || null,
    courier_company: selectedCourier?.courier_code || '',
    courier_type: selectedCourier?.courier_service_code || '',
    delivery_type: orderData.delivery_type || 'now',
    items: items,
  };

  console.log('Payload dikirim ke Biteship:', payload);

  try {
    const response = await axios.post(
      `${BITESHIP_BASE_URL}/v1/orders`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${BITESHIP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Biteship Response:', response.data);

    const updateOrder = await prisma.orders.update({
      where: { id: orderData.id },
      data: {
        courier_tracking_id: response.data.courier?.tracking_id || null,
        courier_waybill_id: response.data.courier?.waybill_id || null,
        courier_link: response.data.courier?.link || null,
      },
    });

    console.log('Order updated:', updateOrder);

    return response.data;
  } catch (error: any) {
    console.error(
      'Error from Biteship API:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
