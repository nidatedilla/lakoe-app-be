/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleId",
ADD COLUMN     "role" TEXT;

-- DropTable
DROP TABLE "roles";
