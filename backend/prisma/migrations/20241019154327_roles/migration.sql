/*
  Warnings:

  - Added the required column `phoneNo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNo" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
