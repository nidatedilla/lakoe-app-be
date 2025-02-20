"use strict";
/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: A list of categories
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
 *                     example: Electronics
 *                   parentId:
 *                     type: string
 *                     example: null
 */
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     description: Retrieve a single category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A single category
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
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   example: null
 */
/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               parentId:
 *                 type: string
 *                 example: null
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   example: null
 */
/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     description: Update an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               parentId:
 *                 type: string
 *                 example: null
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   example: null
 */
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     description: Delete an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 */
/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: A list of categories
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
 *                     example: Electronics
 *                   parentId:
 *                     type: string
 *                     example: null
 */
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     description: Retrieve a single category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A single category
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
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   example: null
 */
/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               parentId:
 *                 type: string
 *                 example: null
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   example: null
 */
/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     description: Update an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               parentId:
 *                 type: string
 *                 example: null
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Electronics
 *                 parentId:
 *                   type: string
 *                   example: null
 */
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     description: Delete an existing category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 */ 
