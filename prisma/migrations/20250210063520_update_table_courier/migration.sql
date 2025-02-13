/*
  Warnings:

  - You are about to drop the column `courier_company` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `courier_insurance` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `courier_type` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_date` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_time` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_type` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `couriers` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `couriers` table. All the data in the column will be lost.
  - Added the required column `available_for_cash_on_delivery` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `available_for_instant_waybill_id` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `available_for_proof_of_delivery` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_code` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_name` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_service_code` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_type` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_duration_range` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipment_duration_unit` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_type` to the `couriers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tier` to the `couriers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "couriers_order_id_key";

-- AlterTable
ALTER TABLE "couriers" DROP COLUMN "courier_company",
DROP COLUMN "courier_insurance",
DROP COLUMN "courier_type",
DROP COLUMN "delivery_date",
DROP COLUMN "delivery_time",
DROP COLUMN "delivery_type",
DROP COLUMN "invoiceId",
DROP COLUMN "order_id",
DROP COLUMN "price",
ADD COLUMN     "available_collection_method" TEXT[],
ADD COLUMN     "available_for_cash_on_delivery" BOOLEAN NOT NULL,
ADD COLUMN     "available_for_instant_waybill_id" BOOLEAN NOT NULL,
ADD COLUMN     "available_for_proof_of_delivery" BOOLEAN NOT NULL,
ADD COLUMN     "courier_code" TEXT NOT NULL,
ADD COLUMN     "courier_name" TEXT NOT NULL,
ADD COLUMN     "courier_service_code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "service_type" TEXT NOT NULL,
ADD COLUMN     "shipment_duration_range" TEXT NOT NULL,
ADD COLUMN     "shipment_duration_unit" TEXT NOT NULL,
ADD COLUMN     "shipping_type" TEXT NOT NULL,
ADD COLUMN     "tier" TEXT NOT NULL;
