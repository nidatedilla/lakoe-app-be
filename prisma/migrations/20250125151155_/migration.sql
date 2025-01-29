/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_productId_key" ON "categories"("productId");
