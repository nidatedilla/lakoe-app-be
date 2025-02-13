/*
  Warnings:

  - You are about to drop the column `guest_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the `variant_option_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variant_options` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[domain]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `combination` to the `variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_variantOptionValueId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_variantOptionValueId_fkey";

-- DropForeignKey
ALTER TABLE "variant_option_values" DROP CONSTRAINT "variant_option_values_variantOptionId_fkey";

-- DropForeignKey
ALTER TABLE "variant_options" DROP CONSTRAINT "variant_options_variantId_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_productId_fkey";

-- DropIndex
DROP INDEX "variants_id_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "guest_id";

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "is_active",
DROP COLUMN "name",
ADD COLUMN     "combination" JSONB NOT NULL,
ADD COLUMN     "order_itemsId" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- DropTable
DROP TABLE "variant_option_values";

-- DropTable
DROP TABLE "variant_options";

-- CreateIndex
CREATE UNIQUE INDEX "stores_domain_key" ON "stores"("domain");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_order_itemsId_fkey" FOREIGN KEY ("order_itemsId") REFERENCES "order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
