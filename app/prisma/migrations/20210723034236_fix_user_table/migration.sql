/*
  Warnings:

  - A unique constraint covering the columns `[pair_name]` on the table `Pair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[team_name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `team_name` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `team_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "team_name",
ADD COLUMN     "team_name" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "team_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pair.pair_name_unique" ON "Pair"("pair_name");

-- CreateIndex
CREATE UNIQUE INDEX "Team.team_name_unique" ON "Team"("team_name");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
