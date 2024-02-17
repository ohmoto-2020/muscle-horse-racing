import { RacetrackCondition } from "./racetrackCondition";
import { RacetrackDistance } from "./racetrackDistance";

export interface Race {
  id: number;
  racetrackCondition: RacetrackCondition; 
  racetrackDistance: RacetrackDistance;
  eventDate: string;
  raceNumber: number;
  createdAt: string;
}
