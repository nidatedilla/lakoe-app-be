/*
  Warnings:

  - A unique constraint covering the columns `[courier_code,courier_service_code]` on the table `couriers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "couriers_courier_code_courier_service_code_key" ON "couriers"("courier_code", "courier_service_code");
