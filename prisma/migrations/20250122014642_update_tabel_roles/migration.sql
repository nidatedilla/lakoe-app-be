/*
  Warnings:

  - You are about to drop the column `admin` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `roles` table. All the data in the column will be lost.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "admin",
DROP COLUMN "seller",
ADD COLUMN     "name" TEXT NOT NULL;
