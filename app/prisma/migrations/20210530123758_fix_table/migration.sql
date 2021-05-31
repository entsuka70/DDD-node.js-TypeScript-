/*
  Warnings:

  - You are about to drop the column `belongs_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[belong_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belong_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_belongs_id_fkey";

-- DropIndex
DROP INDEX "User_belongs_id_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "belongs_id",
ADD COLUMN     "belong_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_belong_id_unique" ON "User"("belong_id");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("belong_id") REFERENCES "Belong"("id") ON DELETE CASCADE ON UPDATE CASCADE;
