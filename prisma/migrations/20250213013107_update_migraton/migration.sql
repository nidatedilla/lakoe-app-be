/*
  Warnings:

  - You are about to drop the column `courier_code` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `courier_service_code` on the `couriers` table. All the data in the column will be lost.
  - The `size` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_active` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the `variant_option_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variant_options` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courier_company` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_type` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_type` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combination` to the `variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_variantOptionValueId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_storeId_fkey";

-- DropForeignKey
ALTER TABLE "variant_option_values" DROP CONSTRAINT "variant_option_values_variantOptionId_fkey";

-- DropForeignKey
ALTER TABLE "variant_options" DROP CONSTRAINT "variant_options_variantId_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_productId_fkey";

-- DropIndex
DROP INDEX "variants_id_key";

-- AlterTable
ALTER TABLE "couriers" DROP COLUMN "courier_code",
DROP COLUMN "courier_service_code",
ADD COLUMN     "courier_company" TEXT NOT NULL,
ADD COLUMN     "courier_insurance" INTEGER,
ADD COLUMN     "courier_type" TEXT NOT NULL,
ADD COLUMN     "delivery_date" TEXT,
ADD COLUMN     "delivery_time" TEXT,
ADD COLUMN     "delivery_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" JSONB,
ALTER COLUMN "storeId" DROP NOT NULL;

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

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "order_number" TEXT NOT NULL,
    "userId" TEXT,
    "storeId" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "discount" DECIMAL(65,30),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "payment_status" TEXT NOT NULL DEFAULT 'unpaid',
    "payment_method" TEXT,
    "shipper_contact_name" TEXT,
    "shipper_contact_phone" TEXT,
    "shipper_contact_email" TEXT,
    "shipper_organization" TEXT,
    "origin_contact_name" TEXT NOT NULL,
    "origin_contact_phone" TEXT NOT NULL,
    "origin_contact_email" TEXT,
    "origin_address" TEXT NOT NULL,
    "origin_note" TEXT,
    "origin_postal_code" TEXT NOT NULL,
    "origin_latitude" DOUBLE PRECISION,
    "origin_longitude" DOUBLE PRECISION,
    "origin_area_id" TEXT,
    "origin_location_id" TEXT,
    "origin_collection_method" TEXT,
    "destination_contact_name" TEXT NOT NULL,
    "destination_contact_phone" TEXT NOT NULL,
    "destination_contact_email" TEXT,
    "destination_address" TEXT NOT NULL,
    "destination_note" TEXT,
    "destination_postal_code" TEXT NOT NULL,
    "destination_latitude" DOUBLE PRECISION,
    "destination_longitude" DOUBLE PRECISION,
    "destination_area_id" TEXT,
    "destination_location_id" TEXT,
    "destination_cash_on_delivery" INTEGER,
    "destination_cash_on_delivery_type" TEXT,
    "destination_proof_of_delivery" BOOLEAN,
    "destination_proof_of_delivery_note" TEXT,
    "courierId" TEXT,
    "tracking_number" TEXT,
    "order_note" TEXT,
    "metadata" JSONB,
    "reference_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "invoicesId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantOptionValueId" TEXT,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER,
    "length" INTEGER,
    "width" INTEGER,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- CreateIndex
CREATE UNIQUE INDEX "orders_reference_id_key" ON "orders"("reference_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_id_key" ON "order_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_url_key" ON "products"("url");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "couriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_order_itemsId_fkey" FOREIGN KEY ("order_itemsId") REFERENCES "order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
