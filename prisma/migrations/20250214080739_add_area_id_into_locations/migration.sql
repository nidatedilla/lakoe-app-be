/*
  Warnings:

  - Added the required column `area_id` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "area_id" TEXT NOT NULL;
