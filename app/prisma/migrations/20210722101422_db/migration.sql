/*
  Warnings:

  - The primary key for the `Issue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pair` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teams_id` on the `Pair` table. All the data in the column will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `belong_id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserIssue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `IssueGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Belong` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `belong` to the `Pair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `Pair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `belong` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_belong_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pair_id_fkey";

-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_teams_id_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_issue_group_id_fkey";

-- DropForeignKey
ALTER TABLE "UserIssue" DROP CONSTRAINT "UserIssue_issue_id_fkey";

-- DropForeignKey
ALTER TABLE "UserIssue" DROP CONSTRAINT "UserIssue_user_id_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "issue_group_id" DROP DEFAULT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Issue_id_seq";

-- AlterTable
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_pkey",
DROP COLUMN "teams_id",
ADD COLUMN     "belong" BOOLEAN NOT NULL,
ADD COLUMN     "team_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Pair_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ADD COLUMN     "belong" BOOLEAN NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "belong_id",
ADD COLUMN     "status" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "pair_id" DROP DEFAULT,
ALTER COLUMN "pair_id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserIssue" DROP CONSTRAINT "UserIssue_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "issue_id" SET DATA TYPE TEXT,
ALTER COLUMN "progress" DROP DEFAULT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "UserIssue_id_seq";

-- DropTable
DROP TABLE "IssueGroup";

-- DropTable
DROP TABLE "Belong";

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("pair_id") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIssue" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIssue" ADD FOREIGN KEY ("issue_id") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
