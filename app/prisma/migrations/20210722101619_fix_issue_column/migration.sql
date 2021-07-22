/*
  Warnings:

  - You are about to drop the column `issue_group_id` on the `Issue` table. All the data in the column will be lost.
  - Added the required column `issue_group` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "issue_group_id",
ADD COLUMN     "issue_group" INTEGER NOT NULL;
