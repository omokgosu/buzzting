/*
  Warnings:

  - You are about to drop the column `age` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "age",
DROP COLUMN "department",
DROP COLUMN "name",
DROP COLUMN "profile_image_url",
ADD COLUMN     "birth_year" INTEGER,
ADD COLUMN     "contact_styles" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "date_styles" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "dating_styles" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "drinking" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "ideal_types" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "mbti" TEXT,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "smoking" TEXT;
