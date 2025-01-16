/*
  Warnings:

  - The values [available,unavailable] on the enum `TableStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `licenseNo` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TableStatus_new" AS ENUM ('empty', 'occupied', 'reserved');
ALTER TABLE "Table" ALTER COLUMN "status" TYPE "TableStatus_new" USING ("status"::text::"TableStatus_new");
ALTER TYPE "TableStatus" RENAME TO "TableStatus_old";
ALTER TYPE "TableStatus_new" RENAME TO "TableStatus";
DROP TYPE "TableStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "tableId" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "kotId" UUID;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "licenseNo" TEXT NOT NULL,
ALTER COLUMN "phoneNo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "salary" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "KOTs" (
    "_id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "tableId" INTEGER,

    CONSTRAINT "KOTs_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_id_key" ON "Table"("id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KOTs" ADD CONSTRAINT "KOTs_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KOTs" ADD CONSTRAINT "KOTs_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_kotId_fkey" FOREIGN KEY ("kotId") REFERENCES "KOTs"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
