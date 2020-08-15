export class Gebruiker {
    username: string;
    userName: string;
    password: string;
    passwordHash: string;
    id: string;
    voornaam?: string;
    achternaam?: string;
    postcode?: string;
    stad?: string;
    straat?: string;
    huisnummer?: string;
    bus?: string;
    telefoonnummer?: string;
    isCoach?: boolean;
    token?: string;

    constructor(username, password){
      this.username = username
      this.password = password
    }
  }