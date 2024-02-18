-- AlterTable
ALTER TABLE "Horse" ALTER COLUMN "weight" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_first_horse_id_fkey" FOREIGN KEY ("first_horse_id") REFERENCES "Horse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_second_horse_id_fkey" FOREIGN KEY ("second_horse_id") REFERENCES "Horse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_third_horse_id_fkey" FOREIGN KEY ("third_horse_id") REFERENCES "Horse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
