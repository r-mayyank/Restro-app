/*
  Warnings:

  - Changed the type of `country` on the `Restaurant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "country",
ADD COLUMN     "country" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Country";
