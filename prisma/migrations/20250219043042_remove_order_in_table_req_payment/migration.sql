/*
  Warnings:

  - You are about to drop the column `orderId` on the `payment_requests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment_requests" DROP CONSTRAINT "payment_requests_orderId_fkey";

-- DropIndex
DROP INDEX "payment_requests_orderId_key";

-- AlterTable
ALTER TABLE "payment_requests" DROP COLUMN "orderId";
