-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "pair_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIssue" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "issue_id" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "issue_name" TEXT NOT NULL,
    "issue_group" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pair" (
    "id" TEXT NOT NULL,
    "pair_name" TEXT NOT NULL,
    "belong" BOOLEAN NOT NULL,
    "team_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "team_name" INTEGER NOT NULL,
    "belong" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pair.pair_name_unique" ON "Pair"("pair_name");

-- CreateIndex
CREATE UNIQUE INDEX "Team.team_name_unique" ON "Team"("team_name");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("pair_id") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIssue" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIssue" ADD FOREIGN KEY ("issue_id") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
