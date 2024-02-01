/*
  Warnings:

  - You are about to drop the column `address` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "address",
DROP COLUMN "city";
