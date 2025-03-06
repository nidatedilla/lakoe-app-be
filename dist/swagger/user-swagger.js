"use strict";
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
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
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   phone:
 *                     type: string
 *                     example: 1234567890
 *                   role:
 *                     type: string
 *                     example: Seller
 *                   stores:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: cm6hodebi0008cedbjnxvui0s
 *                         name:
 *                           type: string
 *                           example: John's Store
 *                         description:
 *                           type: string
 *                           example: Best store in town
 *                         banner:
 *                           type: string
 *                           example: http://example.com/banner.jpg
 *                         logo:
 *                           type: string
 *                           example: http://example.com/logo.jpg
 *                         slogan:
 *                           type: string
 *                           example: Quality products
 */
/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     description: Delete an existing user
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     summary: Update a user
 *     tags: [User]
 *     description: Update an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               role:
 *                 type: string
 *                 example: Seller
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 phone:
 *                   type: string
 *                   example: 1234567890
 *                 role:
 *                   type: string
 *                   example: Seller
 */
/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update a seller's store
 *     tags: [User]
 *     description: Update an existing seller's store
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *                 format: binary
 *               logo:
 *                 type: string
 *                 format: binary
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
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
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
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   phone:
 *                     type: string
 *                     example: 1234567890
 *                   role:
 *                     type: string
 *                     example: Seller
 *                   stores:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: cm6hodebi0008cedbjnxvui0s
 *                         name:
 *                           type: string
 *                           example: John's Store
 *                         description:
 *                           type: string
 *                           example: Best store in town
 *                         banner:
 *                           type: string
 *                           example: http://example.com/banner.jpg
 *                         logo:
 *                           type: string
 *                           example: http://example.com/logo.jpg
 *                         slogan:
 *                           type: string
 *                           example: Quality products
 */
/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     description: Delete an existing user
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     summary: Update a user
 *     tags: [User]
 *     description: Update an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               role:
 *                 type: string
 *                 example: Seller
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 phone:
 *                   type: string
 *                   example: 1234567890
 *                 role:
 *                   type: string
 *                   example: Seller
 */
/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update a seller's store
 *     tags: [User]
 *     description: Update an existing seller's store
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *                 format: binary
 *               logo:
 *                 type: string
 *                 format: binary
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
 */
