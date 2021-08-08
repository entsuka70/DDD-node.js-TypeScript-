/*
  Warnings:

  - Added the required column `issue_no` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "issue_no" INTEGER NOT NULL;
