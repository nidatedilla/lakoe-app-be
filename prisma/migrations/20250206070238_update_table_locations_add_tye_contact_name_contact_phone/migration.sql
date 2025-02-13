/*
  Warnings:

  - Added the required column `contact_name` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_phone` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "contact_name" TEXT NOT NULL,
ADD COLUMN     "contact_phone" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;
