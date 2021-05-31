/*
  Warnings:

  - You are about to drop the column `user_issue_id` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `user_issue_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "user_issue_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_issue_id";
