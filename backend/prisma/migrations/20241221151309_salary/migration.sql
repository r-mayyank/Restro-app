/*
  Warnings:

  - You are about to alter the column `salary` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `country` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Country" AS ENUM ('INDIA', 'BANGLADESH', 'NEPAL');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "country" "Country" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "salary" SET DATA TYPE INTEGER;
