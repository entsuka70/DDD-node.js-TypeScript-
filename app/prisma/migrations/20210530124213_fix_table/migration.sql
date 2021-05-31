/*
  Warnings:

  - Added the required column `pair_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pair_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("pair_id") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;
