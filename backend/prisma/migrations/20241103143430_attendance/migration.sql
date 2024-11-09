/*
  Warnings:

  - The values [EXCUSED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'OWNER', 'MANAGER', 'COOK', 'RECEPTIONIST', 'WAITER', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PRESENT', 'ABSENT', 'LEAVE', 'HOLIDAY', 'LATE');
ALTER TABLE "Attendance" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;
