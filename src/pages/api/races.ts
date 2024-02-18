import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { RaceRequest } from '@/types/race';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const raceData: RaceRequest = req.body.raceData;
    try {
      const savedRace = await prisma.race.create({
        data: raceData,
      });
      res.status(200).json(savedRace);
    } catch (error) {
      res.status(500).json({ message: 'データの保存に失敗しました', error });
    }
  } else if (req.method === 'GET') {
    try {
      const races = await prisma.race.findMany({
        include: {
          racecourse: true,
          racetrackCondition: true,
          racetrackDistance: true,
        },
      });
      res.status(200).json(races);
    } catch (error) {
      res.status(500).json({ message: 'データの取得に失敗しました', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
