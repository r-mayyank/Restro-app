/*
  Warnings:

  - Changed the type of `available` on the `Table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TableAvailability" AS ENUM ('available', 'unavailable');

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "available",
ADD COLUMN     "available" "TableAvailability" NOT NULL;
