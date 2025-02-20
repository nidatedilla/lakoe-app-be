import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { createBiteshipOrder } from '../services/biteship.service';
import { updateOrderWithTracking } from '../repositories/order.repository';
import { v4 as uuidv4 } from 'uuid';

export const biteshipWebhook = async (req: Request, res: Response) => {
  try {
    console.log('Webhook received:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
       res
        .status(200)
        .json({ success: true, message: 'Webhook installed successfully' });
    return
      }

    const {
      order_id,
      status,
      courier_tracking_id,
      courier_waybill_id,
      courier_link,
    } = req.body;

    if (!order_id || !status) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid payload' });
    }

    const order = await prisma.orders.findFirst({
      where: { tracking_number: order_id },
    });

    if (!order) {
      console.warn('Order not found:', order_id);
      return res
        .status(200)
        .json({ success: false, message: 'Order not found' });
    }

    let orderStatus = '';
    switch (status) {
      case 'processed':
        orderStatus = 'Pesanan Baru';
        break;
      case 'allocated':
        orderStatus = 'Siap Dikirim';
        break;
      case 'picking_up':
      case 'picked':
      case 'dropping_off':
        orderStatus = 'Dalam Pengiriman';
        break;
      case 'delivered':
        orderStatus = 'Pesanan Selesai';
        break;
      default:
        orderStatus = order.status;
    }

    const updatedOrder = await prisma.orders.update({
      where: { id: order.id },
      data: {
        status: orderStatus,
        courier_tracking_id,
        courier_waybill_id,
        courier_link,
      },
    });

    console.log('Order updated:', { order_id, status: orderStatus });
    return res
      .status(200)
      .json({ success: true, message: 'Order status updated' });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

export const midtransWebhook = async (req: Request, res: Response) => {
  try {
    const notification = req.body;

    console.log('Webhook Midtrans Diterima', notification);

    const { transaction_status, order_id, payment_type, transaction_id } =
      req.body;

    if (!transaction_status || !order_id) {
      return res
        .status(400)
        .json({ message: 'Invalid request: Missing required parameters' });
    }

    if (transaction_status === 'settlement') {
      const order = await prisma.orders.findUnique({
        where: { id: order_id },
        include: {
          store: {
            include: {
              user: true,
              locations: true,
            },
          },
          order_items: {
            include: {
              product: { include: { categories: true } },
            },
          },
        },
      });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const payment = await prisma.payments.create({
        data: {
          bank: payment_type,
          amount: order.total_price,
          status: 'Success',
          moota_transaction_id: transaction_id,
        },
      });

      const invoice = await prisma.invoices.create({
        data: {
          id: uuidv4(),
          prices: order.total_price,
          status: 'Sudah Dibayar',
          receiver_phone: order.destination_contact_phone ?? null,
          receiver_address: order.destination_address ?? null,
          receiver_name: order.destination_contact_name ?? null,
          invoice_number: `INV-${Date.now()}`,
          paymentId: payment.id,
          courierId: order.courierId || '',
          userId: order.store.userId,
          orders: {
            connect: { id: order.id },
          },
        },
      });

      await prisma.confirmation_payment.create({
        data: {
          amount: order.total_price,
          bank: payment_type,
          invoiceId: invoice.id,
        },
      });

      await prisma.invoice_histories.create({
        data: {
          status: 'Sudah Dibayar',
          invoiceId: invoice.id,
        },
      });

      await prisma.orders.update({
        where: { id: order.id },
        data: {
          status: 'Pesanan Baru',
          payment_status: 'Sudah Dibayar',
          invoicesId: invoice.id,
        },
      });

      const biteshipResponse = await createBiteshipOrder(order);
      if (!biteshipResponse || !biteshipResponse.id) {
        throw new Error('Biteship order creation failed');
      }

      await updateOrderWithTracking(order.id, biteshipResponse.id);

      res.status(200).json({
        message:
          'Payment settled, invoice created, payment confirmed, and order created in Biteship',
      });
    } else {
      res.status(200).json({ message: 'Payment not settled yet' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const midtransWebhookTest = async (req: Request, res: Response) => {
  try {
    const notification = req.body;

    console.log('=== Webhook Midtrans Diterima ===');
    console.log('Order ID:', notification.order_id);
    console.log('Status Code:', notification.status_code);
    console.log('Transaction Status:', notification.transaction_status);
    console.log('Fraud Status:', notification.fraud_status);
    console.log('Gross Amount:', notification.gross_amount);
    console.log('Signature Key:', notification.signature_key);
    console.log('===============================');

     res.status(200).json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook Error:', error);
     res.status(500).json({ error: 'Failed to process webhook' });
     return
  }
};
