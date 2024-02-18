import { Horse } from "./horse";
import { Race } from "./race";

export interface RaceResult {
  id: number;
  race: Race;
  firstHorse: Horse;
  secondHorse: Horse;
  thirdHorse: Horse;
}
