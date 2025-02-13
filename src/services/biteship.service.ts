import axios from 'axios';
import { BITESHIP_API_KEY, BITESHIP_BASE_URL } from '../config/biteship';

export const createBiteshipOrder = async (orderData: any) => {
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

  const payload = {
    shipper_contact_name: orderData.shipper_contact_name || '',
    shipper_contact_phone: orderData.shipper_contact_phone || '',
    shipper_contact_email: orderData.shipper_contact_email || '',
    shipper_organization: orderData.shipper_organization || '',
    origin_contact_name: orderData.origin_contact_name || '',
    origin_contact_phone: orderData.origin_contact_phone || '',
    origin_address: orderData.origin_address || '',
    origin_note: orderData.origin_note || '',
    origin_postal_code: String(orderData.origin_postal_code) || '',
    destination_contact_name: orderData.destination_contact_name || '',
    destination_contact_phone: orderData.destination_contact_phone || '',
    destination_contact_email: orderData.destination_contact_email || '',
    destination_address: orderData.destination_address || '',
    destination_postal_code: String(orderData.destination_postal_code) || '',
    destination_note: orderData.destination_note || '',
    courier_company: orderData.courier_company || '',
    courier_type: orderData.courier_type || '',
    courier_insurance: orderData.courier_insurance || 0,
    delivery_type: orderData.delivery_type || 'now',
    order_note: orderData.order_note || '',
    metadata: orderData.metadata || {},
    items: items,
  };

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
    return response.data;
  } catch (error: any) {
    console.error(
      'Error from Biteship API:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
