-- CreateTable
CREATE TABLE "payment_requests" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "payment_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_requests_id_key" ON "payment_requests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_requests_orderId_key" ON "payment_requests"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_requests_sellerId_key" ON "payment_requests"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_requests_storeId_key" ON "payment_requests"("storeId");

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
