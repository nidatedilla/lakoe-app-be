"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageTemplate = createMessageTemplate;
exports.sendMessage = sendMessage;
exports.updateMessageTemplate = updateMessageTemplate;
exports.deleteMessageTemplate = deleteMessageTemplate;
exports.getMessageTemplate = getMessageTemplate;
const prisma_1 = __importDefault(require("../utils/prisma"));
const querystring_1 = __importDefault(require("querystring"));
async function createMessageTemplate(req, res) {
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }
    try {
        const newTemplate = await prisma_1.default.message_templates.create({
            data: {
                name: title,
                content,
                store: { connect: { userId } },
            },
        });
        res.status(201).json({
            message: 'Message template created successfully',
            template: newTemplate,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating message template', error });
    }
}
async function sendMessage(req, res) {
    try {
        const { templateId, buyerName, buyerPhone, productName, storeName } = req.body;
        if (!templateId ||
            !buyerName ||
            !buyerPhone ||
            !productName ||
            !storeName) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const template = await prisma_1.default.message_templates.findUnique({
            where: { id: templateId },
        });
        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }
        if (!template.content) {
            res.status(400).json({ message: 'Template content is missing' });
            return;
        }
        let messageContent = template.content
            .replace('[Nama Pembeli]', buyerName)
            .replace('[Nama Produk]', productName)
            .replace('[Nama Toko]', storeName);
        const encodedMessage = querystring_1.default.stringify({ text: messageContent });
        const waLink = `https://wa.me/${buyerPhone}?${encodedMessage}`;
        res.status(200).json({
            message: 'Message generated successfully',
            generatedMessage: messageContent,
            waLink,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating message', error });
        return;
    }
}
async function updateMessageTemplate(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        const existingTemplate = await prisma_1.default.message_templates.findUnique({
            where: { id },
            include: { store: true },
        });
        if (!existingTemplate) {
            res.status(404).json({ message: 'Message template not found' });
            return;
        }
        if (!existingTemplate.store || existingTemplate.store.userId !== userId) {
            res
                .status(403)
                .json({ message: 'You are not authorized to edit this template' });
            return;
        }
        const updatedTemplate = await prisma_1.default.message_templates.update({
            where: { id },
            data: {
                name: title,
                content,
            },
        });
        res.status(200).json({
            message: 'Message template updated successfully',
            template: updatedTemplate,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating message template', error });
    }
}
async function deleteMessageTemplate(req, res) {
    const { id } = req.params;
    const userId = res.locals.user.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        const existingTemplate = await prisma_1.default.message_templates.findUnique({
            where: { id },
            include: { store: true },
        });
        if (!existingTemplate) {
            res.status(404).json({ message: 'Message template not found' });
            return;
        }
        if (!existingTemplate.store || existingTemplate.store.userId !== userId) {
            res
                .status(403)
                .json({ message: 'You are not authorized to delete this template' });
            return;
        }
        await prisma_1.default.message_templates.delete({ where: { id } });
        res.status(200).json({ message: 'Message template deleted successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting message template', error });
    }
}
async function getMessageTemplate(req, res) {
    try {
        const userId = res.locals.user.id;
        const store = await prisma_1.default.stores.findUnique({
            where: { userId },
            select: { id: true },
        });
        if (!store) {
            res.status(403).json({ message: 'Unauthorized: Store not found' });
            return;
        }
        const templates = await prisma_1.default.message_templates.findMany({
            where: {
                storeId: store.id,
            },
        });
        res.status(200).json({
            message: 'Message templates retrieved successfully',
            templates,
        });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Error retrieving message templates', error });
    }
}
