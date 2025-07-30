export const USE_SYSTEM_COLOR_MODE = true;

export const SOUND_GUARANTEE = 150;
export const GEAR_RENTAL = 25;

export const defaults = {
  date: new Date().toISOString().split('T')[0],
  band: '',
  location: 'Fulton',
  rent: '330',
  paidAttendees: '',
  unpaidAttendees: '',
  newcomers: '',
  secondDanceCards: '',
  cmic: '',
  doorVolunteer: '',
  floorHost: '',
  rafflePrize: '',
  notes: '',
  ones: '',
  fives: '',
  tens: '',
  twenties: '',
  fifties: '',
  hundreds: '',
  coins: '',
  checks: '',
  electronic: '',
  donations: '',
  memberships: [{ name: '', amount: '' }],
  pettyCash: [{ item: '', amount: '' }],
  startingCash: '200',
  gearRental: false,
  guarantee: '90',
  talent: [
    { name: '', role: 'sound', travel: '' },
    { name: '', role: 'caller', travel: '' },
    { name: '', role: 'musician', travel: '' },
    { name: '', role: 'musician', travel: '' },
  ],
};
