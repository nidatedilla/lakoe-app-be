
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: get product
 *     tags: [Product]
 *     description: get product available
 *     responses:
 *       200:
 *         description: API get product
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: sepatu opera
 *               description:
 *                 type: string
 *                 example: sepatu paling keren
 *               size:
 *                 type: number
 *                 example: 31
 */