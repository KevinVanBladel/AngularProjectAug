import { Gebruiker } from './gebruiker';

export class Wedstrijd {
    id?: number;
    naam: string;
    date: Date;
    hoeveelheid: number;
    gebruikers: Gebruiker[];
  }