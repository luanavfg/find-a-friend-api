/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('cub', 'adult', 'elderly');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('big', 'medium', 'small');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL;
