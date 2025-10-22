// NOTE: These types are duplicated from src/types/worksheet.ts
// Keep in sync when making changes

export interface PersonInput {
  name: string;
  role: string;
  travel: number | string;
  signature?: string;
}

export interface PersonCalculated extends PersonInput {
  travel: number; // narrowed from number | string
  guarantee: number;
  share: number;
  totalPay: number;
}

export interface WorksheetFormData {
  // Basics
  date: string;
  band: string;
  location: string;
  rent: string;
  paidAttendees: string;
  unpaidAttendees: string;
  newcomers: string;
  secondDanceCards: string;
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
  checks: string;
  electronic: string;

  // Donations & memberships
  donations: string;
  memberships: { name: string; amount: string }[];

  // Cash processing
  startingCash: string;
  pettyCash: { item: string; amount: string; }[];

  // Talent
  gearRental: boolean;
  guarantee: string;
  talent: PersonInput[];
}
