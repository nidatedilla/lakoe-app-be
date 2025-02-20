/*
  Warnings:

  - You are about to drop the column `cartId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_district` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_latitude` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `reciver_longitude` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_storeId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_userId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_storeId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_cartId_fkey";

-- DropIndex
DROP INDEX "invoices_cartId_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "cartId",
DROP COLUMN "receiver_district",
DROP COLUMN "receiver_latitude",
DROP COLUMN "reciver_longitude";

-- DropTable
DROP TABLE "cart_items";

-- DropTable
DROP TABLE "carts";
