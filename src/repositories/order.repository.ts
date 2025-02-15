import { v4 as uuidv4 } from 'uuid';
import prisma from '../utils/prisma';

export const createGuestUser = async (contactName: string) => {
  return prisma.users.create({
    data: {
      id: uuidv4(),
      email: `guest-${uuidv4()}@example.com`,
      name: contactName || 'Guest',
      password: '',
      phone: `guest-${uuidv4()}`,
    },
  });
};

export const createOrder = async (orderData: any, userId?: string) => {
  let user = null;

  if (!userId) {
    user = await createGuestUser(orderData.destination_contact_name);
    userId = user.id;
  }

  const orderItemsData = await Promise.all(
    orderData.order_items.map(async (item: any) => {
      const product = await prisma.products.findUnique({
        where: { id: item.productId },
        select: {
          price: true,
          weight: true,
          name: true,
          description: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      return {
        productId: item.productId,
        variantOptionValueId: item.variantOptionValueId ?? null,
        qty: item.qty,
        price: product.price,
        weight: product.weight,
        name: product.name,
        description: product.description,
        categories: product.categories,
        height: item.height ?? null,
        length: item.length ?? null,
        width: item.width ?? null,
      };
    }),
  );

  // const courier = await prisma.couriers.findUnique({
  //   where: { id: orderData.courierId },
  //   select: {
  //     courier_company: true,
  //     courier_type: true,
  //     courier_insurance: true,
  //     delivery_type: true,
  //   },
  // });

  // if (!courier) {
  //   throw new Error(`Courier with ID ${orderData.courierId} not found`);
  // }

  const invoice = await prisma.invoices.create({
    data: {
      id: uuidv4(),
      prices: orderData.total_price || 0,
      service_charge: orderData.service_charge ?? 0,
      status: 'Belum Dibayar',
      reciver_longitude: orderData.receiver_longitude ?? null,
      receiver_latitude: orderData.receiver_latitude ?? null,
      receiver_district: orderData.receiver_district ?? null,
      receiver_phone: orderData.destination_contact_phone
        ? parseInt(orderData.destination_contact_phone)
        : null,
      receiver_address: orderData.destination_address ?? null,
      receiver_name: orderData.destination_contact_name ?? null,
      invoice_number: `INV-${Date.now()}`,
      cartId: orderData.cartId ?? null,
      paymentId: orderData.paymentId,
      courierId: orderData.courierId,
      userId: userId,
    },
  });

  const order = await prisma.orders.create({
    data: {
      order_number: `ORD-${Date.now()}`,
      userId: userId || null,
      storeId: orderData.storeId,
      invoicesId: invoice.id,
      total_price: orderData.total_price || 0,
      discount: orderData.discount ?? null,
      status: 'Pesanan Baru',
      payment_status: 'Belum Dibayar',
      payment_method: orderData.payment_method ?? null,
      shipper_contact_name: orderData.shipper_contact_name || '',
      shipper_contact_phone: orderData.shipper_contact_phone || '',
      shipper_contact_email: orderData.shipper_contact_email || '',
      shipper_organization: orderData.shipper_organization || '',
      origin_contact_name: orderData.origin_contact_name || '',
      origin_contact_phone: orderData.origin_contact_phone || '',
      origin_contact_email: orderData.origin_contact_email || '',
      origin_address: orderData.origin_address || '',
      origin_note: orderData.origin_note || '',
      origin_postal_code: String(orderData.origin_postal_code) || '',
      destination_contact_name: orderData.destination_contact_name || '',
      destination_contact_phone: orderData.destination_contact_phone || '',
      destination_contact_email: orderData.destination_contact_email || '',
      destination_address: orderData.destination_address || '',
      destination_note: orderData.destination_note || '',
      destination_postal_code: String(orderData.destination_postal_code) || '',
      courierId: orderData.courierId,
      order_note: orderData.order_note,
      created_at: new Date(),
      updated_at: new Date(),
      order_items: {
        create: orderItemsData.map((item: any) => ({
          qty: item.qty,
          price: item.price,
          weight: item.weight,
          height: item.height,
          length: item.length,
          width: item.width,
          product: {
            connect: { id: item.productId },
          },
        })),
      },
    },
    include: {
      order_items: {
        include: {
          product: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
          variant: true,
        },
      },
      courier: true,
      invoices: true,
    },
  });

  return order;
};

export const updateOrderWithTracking = async (
  orderId: string,
  trackingNumber: string,
) => {
  return prisma.orders.update({
    where: { id: orderId },
    data: {
      tracking_number: trackingNumber,
      status: 'processed',
    },
  });
};

export const getOrdersByStoreId = async (storeId: string) => {
  return await prisma.orders.findMany({
    where: { storeId },
    include: {
      order_items: {
        include: {
          product: true,
        },
      },
      user: true,
      courier: true,
      invoices: true,
    },
  });
};

export const findStoreByUserId = async (userId: string) => {
  return await prisma.stores.findUnique({
    where: {
      userId: userId,
    },
  });
};

export const getOrderById = async (orderId: string) => {
  return await prisma.orders.findUnique({
    where: { id: orderId },
    include: {
      order_items: {
        include: {
          product: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
      store: true,
      courier: true,
      invoices: {
        select: {
          invoice_number: true,
        },
      },
    },
  });
};

export const getSellerAreaId = async (storeId: string) => {
  const location = await prisma.locations.findFirst({
    where: { storeId },
    select: { area_id: true },
  });

  return location || null;
};
