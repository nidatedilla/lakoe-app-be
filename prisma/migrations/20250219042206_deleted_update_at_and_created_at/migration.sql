/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `confirmation_payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `confirmation_payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `decoration` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `decoration` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `message_templates` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `message_templates` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `operation_hours` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `operation_hours` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `productCategories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `productCategories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `stores_in_decorations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `stores_in_decorations` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `variants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "confirmation_payment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "couriers" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "decoration" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "message_templates" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "operation_hours" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "payment_requests" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "productCategories" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "stores" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "stores_in_decorations" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
