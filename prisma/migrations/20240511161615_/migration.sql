/*
  Warnings:

  - The `price_level` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "price_level",
ADD COLUMN     "price_level" TEXT;
