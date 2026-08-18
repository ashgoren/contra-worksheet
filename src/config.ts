import type { Role, PaymentMethod, ExpenseTiming } from 'types/worksheet';

export const USE_SYSTEM_COLOR_MODE = true;

export const SOUND_GUARANTEE = 150;
export const GEAR_RENTAL = 25;

export const MAX_SHARES_PER_ROLE: Record<string, number> = {
  sound: 1,
  caller: 1,
  musician: 4
}

export const DEFAULTS = {
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
  donationsCash: '',
  donationsCheck: '',
  donationsElectronic: '',
  memberships: [{ name: '', amount: '', method: 'cash' as PaymentMethod }],
  pettyCash: [{ item: '', amount: '', timing: '' as ExpenseTiming | '' }],
  startingCash: '200',
  gearRental: false,
  gearRentalFee: '0',
  guarantee: '90',
  talent: [
    { name: '', role: 'sound' as Role, travel: '' },
    { name: '', role: 'caller' as Role, travel: '' },
    { name: '', role: 'musician' as Role, travel: '' },
    { name: '', role: 'musician' as Role, travel: '' },
  ],
  submittedBy: '',
  submissionNote: '',
};
