/*
  Warnings:

  - A unique constraint covering the columns `[guestId]` on the table `locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "locations_guestId_key" ON "locations"("guestId");
