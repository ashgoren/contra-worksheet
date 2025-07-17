  export interface WorksheetFormData {

    // Basics
    date: string;
    band: string;
    location: string;
    rent: number;
    paidAttendees: number | null;
    unpaidAttendees: number | null;
    newcomers: number | null;
    secondDanceCards: number | null;
    cmic: string;
    doorVolunteer: string;
    floorHost: string;
    rafflePrize: string;
    notes: string;

    // Cash
    ones: number | null;
    fives: number | null;
    tens: number | null;
    twenties: number | null;
    fifties: number | null;
    hundreds: number | null;
    coins: number | null;
    startingCash: number;

  }
