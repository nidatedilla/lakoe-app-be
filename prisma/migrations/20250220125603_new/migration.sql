/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `bank_accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId]` on the table `bank_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "acc_num" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "rate_courier" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_userId_key" ON "bank_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_storeId_key" ON "bank_accounts"("storeId");

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
