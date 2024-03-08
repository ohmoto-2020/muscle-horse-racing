import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface ScrapedData {
  racecourseCode: number;
  raceNumber: number;
  racetrackCondition: string;
  racetrackDistance: number;
  horses: [{ name: string; entryNumber: number; weight: number }];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const scrapedData: ScrapedData = req.body;

    try {
      const result = await prisma.$transaction(async (prisma) => {
        const racecourse = await prisma.racecourse.findFirst({
          where: {
            code: scrapedData.racecourseCode,
          },
        });

        if (!racecourse) {
          throw new Error("Racecourse not found");
        }

        // Raceレコードを作成
        const race = await prisma.race.create({
          data: {
            racecourseId: racecourse.id,
            eventDate: new Date(),
            raceNumber: scrapedData.raceNumber,
            racetrackCondition: scrapedData.racetrackCondition,
            racetrackDistance: scrapedData.racetrackDistance.toString(),
          },
        });

        // Horseレコードを作成
        const horseOperations = scrapedData.horses.map((horseData) =>
          prisma.horse.create({
            data: {
              raceId: race.id,
              entryNumber: horseData.entryNumber,
              name: horseData.name,
              weight: horseData.weight,
            },
          }),
        );

        await Promise.all(horseOperations);
        return race;
      });

      res.status(200).json({ message: "Data saved successfully", race: result });
    } catch (error) {
      console.error("Transaction failed: ", error);
      await prisma.$disconnect();
      res.status(500).json({ message: "Failed to save data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
