/**
 * @swagger
 * /api/message-templates:
 *   get:
 *     summary: Get all message templates
 *     tags: [MessageTemplate]
 *     description: Retrieve a list of all message templates
 *     responses:
 *       200:
 *         description: A list of message templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: cm6hodebi0008cedbjnxvui0s
 *                   name:
 *                     type: string
 *                     example: 'Template 1'
 *                   content:
 *                     type: string
 *                     example: 'Halo [Nama Pembeli], selamat datang di [Nama Toko]!'
 *                   createdAt:
 *                     type: string
 *                     example: '2025-02-01T12:00:00Z'
 *                   updatedAt:
 *                     type: string
 *                     example: '2025-02-01T12:00:00Z'

 *   post:
 *     summary: Create a new message template
 *     tags: [MessageTemplate]
 *     description: Create a new message template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Template Baru'
 *               content:
 *                 type: string
 *                 example: 'Halo [Nama Pembeli], pesanan Anda untuk [Nama Produk] dari [Nama Toko] telah diproses.'
 *     responses:
 *       201:
 *         description: Message template created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Template pesan berhasil dibuat'
 *                 template:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cm6hodebi0008cedbjnxvui0s
 *                     name:
 *                       type: string
 *                       example: 'Template Baru'
 *                     content:
 *                       type: string
 *                       example: 'Halo [Nama Pembeli], pesanan Anda untuk [Nama Produk] dari [Nama Toko] telah diproses.'

 * /api/message-templates/{id}:
 *   put:
 *     summary: Update an existing message template
 *     tags: [MessageTemplate]
 *     description: Update an existing message template by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message template to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Template yang Diperbarui'
 *               content:
 *                 type: string
 *                 example: 'Konten yang diperbarui untuk template.'
 *     responses:
 *       200:
 *         description: Message template updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Template pesan berhasil diperbarui'
 *                 template:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cm6hodebi0008cedbjnxvui0s
 *                     name:
 *                       type: string
 *                       example: 'Template yang Diperbarui'
 *                     content:
 *                       type: string
 *                       example: 'Konten yang diperbarui untuk template.'

 *   delete:
 *     summary: Delete an existing message template
 *     tags: [MessageTemplate]
 *     description: Delete an existing message template by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message template to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message template deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Template pesan berhasil dihapus'

 * /api/message-templates/send:
 *   post:
 *     summary: Generate a message using a template
 *     tags: [Message]
 *     description: Generate a personalized message using a template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               templateId:
 *                 type: string
 *                 example: 'cm6hodebi0008cedbjnxvui0s'
 *               buyerId:
 *                 type: string
 *                 example: 'cm6hodebi0008cedbjnxvui0s'
 *               productId:
 *                 type: string
 *                 example: 'cm6hodebi0008cedbjnxvui0s'
 *     responses:
 *       200:
 *         description: Message generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Pesan berhasil dihasilkan'
 *                 generatedMessage:
 *                   type: string
 *                   example: 'Halo John, pesanan Anda untuk Laptop dari Tech Store telah diproses.'
 *       404:
 *         description: Template, Buyer, or Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Template tidak ditemukan'
 */
