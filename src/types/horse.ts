import { Race } from "./race";

export interface Horse {
  id: number;
  name: string;
  weight: number;
  entryNumber: number;
  race: Race;
}
