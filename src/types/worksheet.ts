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
    ones: string;
    fives: string;
    tens: string;
    twenties: string;
    fifties: string;
    hundreds: string;
    coins: string;

    // Other payment methods
    checks: number | null;
    electronic: number | null;

    // Donations & memberships
    donations: number | null;
    memberships: { name: string; amount: number | null }[];

    // Cash processing
    startingCash: number;
    pettyCash: { item: string; amount: number | null; }[];
  }
