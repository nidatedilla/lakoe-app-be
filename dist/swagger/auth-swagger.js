"use strict";
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: add new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: aan
 *               email:
 *                 type: string
 *                 example: mail@email.com
 *               password:
 *                 type: string
 *                 example: mamamia123
 *               phone:
 *                 type: number
 *                 example: 09283712
 *     responses:
 *       201:
 *         description: user add successfully
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mail@email.com
 *               password:
 *                 type: string
 *                 example: mamamia123
 *     responses:
 *       200:
 *         description: user login successfully
 */ 
