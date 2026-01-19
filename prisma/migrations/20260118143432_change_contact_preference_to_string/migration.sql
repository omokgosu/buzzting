/*
  Warnings:

  - You are about to drop the column `contact_info` on the `profiles` table. All the data in the column will be lost.
  - The `contact_preference` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "contact_info",
DROP COLUMN "contact_preference",
ADD COLUMN     "contact_preference" TEXT;

-- DropEnum
DROP TYPE "ContactPreference";
