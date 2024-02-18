import { Horse } from "./horse";
import { RaceResult } from "./raceResult";
import { Racecourse } from "./racecourse";
import { RacetrackCondition } from "./racetrackCondition";
import { RacetrackDistance } from "./racetrackDistance";

export interface Race {
  id: number;
  eventDate: string;
  raceNumber: number;
  racecourse: Racecourse;
  racetrackCondition: RacetrackCondition;
  racetrackDistance: RacetrackDistance;
  raceResult: RaceResult;
  horses: Horse[];
  createdAt: string;
}

export interface RaceRequest {
  eventDate: string;
  raceNumber: number;
  racecourseId: number;
  racetrackConditionId: number;
  racetrackDistanceId: number;
}
