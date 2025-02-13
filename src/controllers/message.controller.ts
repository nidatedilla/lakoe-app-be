import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import querystring from 'querystring';

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
  try {
    const { templateId, buyerName, buyerPhone, productName, storeName } =
      req.body;

    if (
      !templateId ||
      !buyerName ||
      !buyerPhone ||
      !productName ||
      !storeName
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const template = await prisma.message_templates.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    if (!template.content) {
      return res.status(400).json({ message: 'Template content is missing' });
    }

    let messageContent = template.content
      .replace('[Nama Pembeli]', buyerName)
      .replace('[Nama Produk]', productName)
      .replace('[Nama Toko]', storeName);

    const encodedMessage = querystring.stringify({ text: messageContent });
    const waLink = `https://wa.me/${buyerPhone}?${encodedMessage}`;

    return res.status(200).json({
      message: 'Message generated successfully',
      generatedMessage: messageContent,
      waLink,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error generating message', error });
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
