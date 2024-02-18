/*
  Warnings:

  - Changed the type of `weight` on the `Horse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
BEGIN;
ALTER TABLE "Horse" ADD COLUMN "new_weight" INTEGER NOT NULL DEFAULT 0;
UPDATE "Horse" SET "new_weight" = "weight"::INTEGER WHERE "weight" IS NOT NULL;
ALTER TABLE "Horse" DROP COLUMN "weight";
ALTER TABLE "Horse" RENAME COLUMN "new_weight" TO "weight";
COMMIT;

