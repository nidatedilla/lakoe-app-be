-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "courier_link" TEXT,
ADD COLUMN     "courier_tracking_id" TEXT,
ADD COLUMN     "courier_waybill_id" TEXT;
