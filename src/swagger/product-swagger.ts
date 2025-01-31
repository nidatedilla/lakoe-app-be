/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     description: Retrieve a list of all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: cm6jggpz20001jih3nteq8nfy
 *                   name:
 *                     type: string
 *                     example: sepatu opera
 *                   description:
 *                     type: string
 *                     example: sepatu paling keren
 *                   size:
 *                     type: number
 *                     example: 31
 *                   minimum_order:
 *                     type: number
 *                     example: 1
 *                   attachments:
 *                     type: string
 *                     example: http://example.com/image.jpg
 *                   storeId:
 *                     type: string
 *                     example: cm6hodebi0008cedbjnxvui0s
 *                   is_active:
 *                     type: boolean
 *                     example: true
 *                   categoryId:
 *                     type: string
 *                     example: cm6hodebi0008cedbjnxvui0s
 *                   stock:
 *                     type: number
 *                     example: 100
 *                   sku:
 *                     type: string
 *                     example: SKU12345
 *                   price:
 *                     type: number
 *                     example: 50000
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     description: Retrieve a single product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 *                 name:
 *                   type: string
 *                   example: sepatu opera
 *                 description:
 *                   type: string
 *                   example: sepatu paling keren
 *                 size:
 *                   type: number
 *                   example: 31
 *                 minimum_order:
 *                   type: number
 *                   example: 1
 *                 attachments:
 *                   type: string
 *                   example: http://example.com/image.jpg
 *                 storeId:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 is_active:
 *                   type: boolean
 *                   example: true
 *                 categoryId:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 stock:
 *                   type: number
 *                   example: 100
 *                 sku:
 *                   type: string
 *                   example: SKU12345
 *                 price:
 *                   type: number
 *                   example: 50000
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
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
 *               minimum_order:
 *                 type: number
 *                 example: 1
 *               attachments:
 *                 type: string
 *                 format: binary
 *               categoryId:
 *                 type: string
 *                 example: cm6hodebi0008cedbjnxvui0s
 *               stock:
 *                 type: number
 *                 example: 100
 *               sku:
 *                 type: string
 *                 example: SKU12345
 *               price:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 *                 name:
 *                   type: string
 *                   example: sepatu opera
 *                 description:
 *                   type: string
 *                   example: sepatu paling keren
 *                 size:
 *                   type: number
 *                   example: 31
 *                 minimum_order:
 *                   type: number
 *                   example: 1
 *                 attachments:
 *                   type: string
 *                   example: http://example.com/image.jpg
 *                 storeId:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 is_active:
 *                   type: boolean
 *                   example: true
 *                 categoryId:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 stock:
 *                   type: number
 *                   example: 100
 *                 sku:
 *                   type: string
 *                   example: SKU12345
 *                 price:
 *                   type: number
 *                   example: 50000
 */

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     description: Update an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
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
 *               minimum_order:
 *                 type: number
 *                 example: 1
 *               attachments:
 *                 type: string
 *                 example: http://example.com/image.jpg
 *               categoryId:
 *                 type: string
 *                 example: cm6hodebi0008cedbjnxvui0s
 *               stock:
 *                 type: number
 *                 example: 100
 *               sku:
 *                 type: string
 *                 example: SKU12345
 *               price:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 *                 name:
 *                   type: string
 *                   example: sepatu opera
 *                 description:
 *                   type: string
 *                   example: sepatu paling keren
 *                 size:
 *                   type: number
 *                   example: 31
 *                 minimum_order:
 *                   type: number
 *                   example: 1
 *                 attachments:
 *                   type: string
 *                   example: http://example.com/image.jpg
 *                 storeId:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 is_active:
 *                   type: boolean
 *                   example: true
 *                 categoryId:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 stock:
 *                   type: number
 *                   example: 100
 *                 sku:
 *                   type: string
 *                   example: SKU12345
 *                 price:
 *                   type: number
 *                   example: 50000
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     description: Delete an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 */

/**
 * @swagger
 * /api/product/status/{isActive}:
 *   get:
 *     summary: Get products by active status
 *     tags: [Product]
 *     description: Retrieve a list of products by their active status
 *     parameters:
 *       - in: path
 *         name: isActive
 *         required: true
 *         schema:
 *           type: boolean
 *         description: The active status of the products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: cm6jggpz20001jih3nteq8nfy
 *                   name:
 *                     type: string
 *                     example: sepatu opera
 *                   description:
 *                     type: string
 *                     example: sepatu paling keren
 *                   size:
 *                     type: number
 *                     example: 31
 *                   minimum_order:
 *                     type: number
 *                     example: 1
 *                   attachments:
 *                     type: string
 *                     example: http://example.com/image.jpg
 *                   storeId:
 *                     type: string
 *                     example: cm6hodebi0008cedbjnxvui0s
 *                   is_active:
 *                     type: boolean
 *                     example: true
 *                   categoryId:
 *                     type: string
 *                     example: cm6hodebi0008cedbjnxvui0s
 *                   stock:
 *                     type: number
 *                     example: 100
 *                   sku:
 *                     type: string
 *                     example: SKU12345
 *                   price:
 *                     type: number
 *                     example: 50000
 */