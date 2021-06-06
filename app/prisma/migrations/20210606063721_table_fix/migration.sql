-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "issue_group_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "IssueGroup" ALTER COLUMN "issue_group" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Pair" ALTER COLUMN "teams_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "belong_id" SET DEFAULT 1,
ALTER COLUMN "pair_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "UserIssue" ALTER COLUMN "progress" SET DEFAULT 1;
