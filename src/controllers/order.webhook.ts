import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { createBiteshipOrder } from '../services/biteship.service';
import { updateOrderWithTracking } from '../repositories/order.repository';

export const biteshipWebhook = async (req: Request, res: Response) => {
  try {
    console.log('Webhook received:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      res
        .status(200)
        .json({ success: true, message: 'Webhook installed successfully' });
      return;
    }

    const { order_id, status } = req.body;

    if (!order_id || !status) {
      res.status(400).json({ success: false, message: 'Invalid payload' });
      return;
    }

    const order = await prisma.orders.findFirst({
      where: { tracking_number: order_id },
    });

    if (!order) {
      console.warn('Order not found:', order_id);
      res.status(200).json({ success: false, message: 'Order not found' });
      return;
    }

    await prisma.orders.update({
      where: { id: order.id },
      data: { status },
    });

    console.log('Order updated:', { order_id, status });
    res.status(200).json({ success: true, message: 'Order status updated' });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const midtransWebhook = async (req: Request, res: Response) => {
  try {
    const { transaction_status, order_id } = req.body;

    if (transaction_status === 'settlement') {
      const order = await prisma.orders.findUnique({
        where: { id: order_id },
      });

      if (order) {
        const updatedOrderData = {};

        const biteshipResponse = await createBiteshipOrder(updatedOrderData);
        await updateOrderWithTracking(order.id, biteshipResponse.id);

        res
          .status(200)
          .json({ message: 'Payment settled, order created in Biteship' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(200).json({ message: 'Payment not settled yet' });
    }
  } catch (error: any) {
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

    return res.status(200).json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Failed to process webhook' });
  }
};
