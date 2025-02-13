/*
  Warnings:

  - You are about to drop the column `city_district` on the `locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locations" DROP COLUMN "city_district",
ADD COLUMN     "districts" TEXT,
ADD COLUMN     "provinces" TEXT,
ADD COLUMN     "regencies" TEXT,
ADD COLUMN     "villages" TEXT;
