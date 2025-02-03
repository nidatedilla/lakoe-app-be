import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMessageTemplate(req: Request, res: Response) {
  const { title, content } = req.body;
  const userId = res.locals.user.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newTemplate = await prisma.message_templates.create({
      data: {
        name: title,
        content,
        store: { connect: { userId } },
      },
    });

    return res.status(201).json({
      message: 'Message template created successfully',
      template: newTemplate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating message template', error });
  }
}

export async function sendMessage(req: Request, res: Response) {
  const { templateId, buyerId, productId } = req.body;

  try {
    const template = await prisma.message_templates.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const buyer = await prisma.users.findUnique({ where: { id: buyerId } });

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });
    if (!buyer || !product) {
      return res.status(404).json({ message: 'Buyer or product not found' });
    }

    const store = await prisma.stores.findUnique({
      where: { id: product.storeId },
    });

    let messageContent = template.content || '';
    messageContent = messageContent.replace('[Nama Pembeli]', buyer.name);
    messageContent = messageContent.replace('[Nama Produk]', product.name);
    messageContent = messageContent.replace(
      '[Nama Toko]',
      store?.name || 'Toko',
    );

    return res.status(200).json({
      message: 'Message generated successfully',
      generatedMessage: messageContent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating message', error });
  }
}

export async function updateMessageTemplate(req: Request, res: Response) {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = res.locals.user.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const existingTemplate = await prisma.message_templates.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!existingTemplate) {
      return res.status(404).json({ message: 'Message template not found' });
    }

    if (!existingTemplate.store || existingTemplate.store.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to edit this template' });
    }

    const updatedTemplate = await prisma.message_templates.update({
      where: { id },
      data: {
        name: title,
        content,
      },
    });

    return res.status(200).json({
      message: 'Message template updated successfully',
      template: updatedTemplate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating message template', error });
  }
}

export async function deleteMessageTemplate(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const existingTemplate = await prisma.message_templates.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!existingTemplate) {
      return res.status(404).json({ message: 'Message template not found' });
    }

    if (!existingTemplate.store || existingTemplate.store.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this template' });
    }

    await prisma.message_templates.delete({ where: { id } });

    return res
      .status(200)
      .json({ message: 'Message template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message template', error });
  }
}

export async function getMessageTemplate(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

    const store = await prisma.stores.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!store) {
      return res.status(403).json({ message: 'Unauthorized: Store not found' });
    }

    const templates = await prisma.message_templates.findMany({
      where: {
        storeId: store.id,
      },
    });

    return res.status(200).json({
      message: 'Message templates retrieved successfully',
      templates,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving message templates', error });
  }
}
