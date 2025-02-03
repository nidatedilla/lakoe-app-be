/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "is_active" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "stores_userId_key" ON "stores"("userId");
