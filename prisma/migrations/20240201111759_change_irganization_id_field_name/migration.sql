/*
  Warnings:

  - You are about to drop the column `organizationId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organizationId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
