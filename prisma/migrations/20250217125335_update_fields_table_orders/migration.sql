/*
  Warnings:

  - You are about to drop the column `destination_area_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_cash_on_delivery` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_cash_on_delivery_type` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_contact_email` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_latitude` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_location_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_longitude` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_note` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_proof_of_delivery` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `destination_proof_of_delivery_note` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `order_note` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `order_number` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_area_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_collection_method` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_contact_email` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_latitude` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_location_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_longitude` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `origin_note` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `reference_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipper_contact_email` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipper_contact_name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipper_contact_phone` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipper_organization` on the `orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "orders_order_number_key";

-- DropIndex
DROP INDEX "orders_reference_id_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "destination_area_id",
DROP COLUMN "destination_cash_on_delivery",
DROP COLUMN "destination_cash_on_delivery_type",
DROP COLUMN "destination_contact_email",
DROP COLUMN "destination_latitude",
DROP COLUMN "destination_location_id",
DROP COLUMN "destination_longitude",
DROP COLUMN "destination_note",
DROP COLUMN "destination_proof_of_delivery",
DROP COLUMN "destination_proof_of_delivery_note",
DROP COLUMN "discount",
DROP COLUMN "metadata",
DROP COLUMN "order_note",
DROP COLUMN "order_number",
DROP COLUMN "origin_area_id",
DROP COLUMN "origin_collection_method",
DROP COLUMN "origin_contact_email",
DROP COLUMN "origin_latitude",
DROP COLUMN "origin_location_id",
DROP COLUMN "origin_longitude",
DROP COLUMN "origin_note",
DROP COLUMN "reference_id",
DROP COLUMN "shipper_contact_email",
DROP COLUMN "shipper_contact_name",
DROP COLUMN "shipper_contact_phone",
DROP COLUMN "shipper_organization",
ALTER COLUMN "status" SET DEFAULT 'Belum Dibayar',
ALTER COLUMN "payment_status" SET DEFAULT 'Belum Dibayar';
