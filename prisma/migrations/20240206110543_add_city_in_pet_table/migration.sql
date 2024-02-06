/*
  Warnings:

  - Added the required column `cep` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "city" TEXT NOT NULL;
