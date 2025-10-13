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
  talent: { name: string; role: string; travel: string, signature?: string }[];
};
