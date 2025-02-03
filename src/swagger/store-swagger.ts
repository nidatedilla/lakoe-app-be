/**
 * @swagger
 * /api/store:
 *   get:
 *     summary: Get all stores
 *     tags: [Store]
 *     description: Retrieve a list of all stores
 *     responses:
 *       200:
 *         description: A list of stores
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
 *                     example: John's Store
 *                   description:
 *                     type: string
 *                     example: Best store in town
 *                   banner:
 *                     type: string
 *                     example: http://example.com/banner.jpg
 *                   logo:
 *                     type: string
 *                     example: http://example.com/logo.jpg
 *                   slogan:
 *                     type: string
 *                     example: Quality products
 *                   userId:
 *                     type: string
 *                     example: cm6jggpz20001jih3nteq8nfy
 */

/**
 * @swagger
 * /api/store/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags: [Store]
 *     description: Retrieve a single store by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The store ID
 *     responses:
 *       200:
 *         description: A single store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 name:
 *                   type: string
 *                   example: John's Store
 *                 description:
 *                   type: string
 *                   example: Best store in town
 *                 banner:
 *                   type: string
 *                   example: http://example.com/banner.jpg
 *                 logo:
 *                   type: string
 *                   example: http://example.com/logo.jpg
 *                 slogan:
 *                   type: string
 *                   example: Quality products
 *                 userId:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 */

/**
 * @swagger
 * /api/store/update:
 *   patch:
 *     summary: Update a store
 *     tags: [Store]
 *     description: Update an existing store
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John's Store
 *               description:
 *                 type: string
 *                 example: Best store in town
 *               banner:
 *                 type: string
 *                 example: http://example.com/banner.jpg
 *               logo:
 *                 type: string
 *                 example: http://example.com/logo.jpg
 *               slogan:
 *                 type: string
 *                 example: Quality products
 *     responses:
 *       200:
 *         description: Store updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 name:
 *                   type: string
 *                   example: John's Store
 *                 description:
 *                   type: string
 *                   example: Best store in town
 *                 banner:
 *                   type: string
 *                   example: http://example.com/banner.jpg
 *                 logo:
 *                   type: string
 *                   example: http://example.com/logo.jpg
 *                 slogan:
 *                   type: string
 *                   example: Quality products
 *                 userId:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 */

/**
 * @swagger
 * /api/store/delete:
 *   delete:
 *     summary: Delete a store
 *     tags: [Store]
 *     description: Delete an existing store
 *     responses:
 *       200:
 *         description: Store deleted successfully
 */

/**
 * @swagger
 * /api/store:
 *   get:
 *     summary: Get all stores
 *     tags: [Store]
 *     description: Retrieve a list of all stores
 *     responses:
 *       200:
 *         description: A list of stores
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
 *                     example: John's Store
 *                   description:
 *                     type: string
 *                     example: Best store in town
 *                   banner:
 *                     type: string
 *                     example: http://example.com/banner.jpg
 *                   logo:
 *                     type: string
 *                     example: http://example.com/logo.jpg
 *                   slogan:
 *                     type: string
 *                     example: Quality products
 *                   userId:
 *                     type: string
 *                     example: cm6jggpz20001jih3nteq8nfy
 */

/**
 * @swagger
 * /api/store/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags: [Store]
 *     description: Retrieve a single store by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The store ID
 *     responses:
 *       200:
 *         description: A single store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 name:
 *                   type: string
 *                   example: John's Store
 *                 description:
 *                   type: string
 *                   example: Best store in town
 *                 banner:
 *                   type: string
 *                   example: http://example.com/banner.jpg
 *                 logo:
 *                   type: string
 *                   example: http://example.com/logo.jpg
 *                 slogan:
 *                   type: string
 *                   example: Quality products
 *                 userId:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 */

/**
 * @swagger
 * /api/store/update:
 *   patch:
 *     summary: Update a store
 *     tags: [Store]
 *     description: Update an existing store
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John's Store
 *               description:
 *                 type: string
 *                 example: Best store in town
 *               banner:
 *                 type: string
 *                 example: http://example.com/banner.jpg
 *               logo:
 *                 type: string
 *                 example: http://example.com/logo.jpg
 *               slogan:
 *                 type: string
 *                 example: Quality products
 *     responses:
 *       200:
 *         description: Store updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cm6hodebi0008cedbjnxvui0s
 *                 name:
 *                   type: string
 *                   example: John's Store
 *                 description:
 *                   type: string
 *                   example: Best store in town
 *                 banner:
 *                   type: string
 *                   example: http://example.com/banner.jpg
 *                 logo:
 *                   type: string
 *                   example: http://example.com/logo.jpg
 *                 slogan:
 *                   type: string
 *                   example: Quality products
 *                 userId:
 *                   type: string
 *                   example: cm6jggpz20001jih3nteq8nfy
 */

/**
 * @swagger
 * /api/store/delete:
 *   delete:
 *     summary: Delete a store
 *     tags: [Store]
 *     description: Delete an existing store
 *     responses:
 *       200:
 *         description: Store deleted successfully
 */
