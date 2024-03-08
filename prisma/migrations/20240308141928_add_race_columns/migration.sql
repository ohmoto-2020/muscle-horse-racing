/*
  Warnings:

  - You are about to drop the column `racetrack_condition_id` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `racetrack_distance_id` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the `RacetrackCondition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RacetrackDistance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `racetrackCondition` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `racetrackDistance` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Race" DROP CONSTRAINT "Race_racetrack_condition_id_fkey";

-- DropForeignKey
ALTER TABLE "Race" DROP CONSTRAINT "Race_racetrack_distance_id_fkey";

-- AlterTable
ALTER TABLE "Race" DROP COLUMN "racetrack_condition_id",
DROP COLUMN "racetrack_distance_id",
ADD COLUMN     "racetrackCondition" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "racetrackDistance" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "RacetrackCondition";

-- DropTable
DROP TABLE "RacetrackDistance";
