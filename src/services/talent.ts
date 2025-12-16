import { isNum } from 'utils';
import { calculateFinancials } from './financials';
import { SOUND_GUARANTEE, GEAR_RENTAL, MAX_SHARES_PER_ROLE } from 'src/config';
import type { WorksheetFormData, PersonCalculated, Role } from 'types/worksheet';

const calculatePortions = (amount: number, talent: { role: Role }[]) => {
  const roles: Role[] = ['sound', 'caller', 'musician'];
  return roles.reduce((acc, role) => {
    const numPeople = talent.filter(t => t.role === role).length;
    if (numPeople === 0) {
      return { ...acc, [role]: 0 };
    }
    const maxShares = MAX_SHARES_PER_ROLE[role];
    const portion = numPeople <= maxShares ? amount : amount * maxShares / numPeople;
    return { ...acc, [role]: portion };
  }, {} as Record<'sound' | 'caller' | 'musician', number>);
};

export const calculateTalent = (data: WorksheetFormData): {
  talent: PersonCalculated[] | null,
  payBasis: number | null,
  pcdcGuarantee: number | null,
  pcdcShare: number | null,
  gearRental: number | null,
  totalTravel: number | null,
  totalGuarantee: number | null
} => {
  const { admissions, miscExpenses, rent } = calculateFinancials(data);

  if (!isNum(admissions) || !isNum(miscExpenses) || !isNum(rent)) {
    return {
      talent: null,
      payBasis: null,
      pcdcGuarantee: null,
      pcdcShare: null,
      gearRental: null,
      totalTravel: null,
      totalGuarantee: null
    };
  }

  const talentTrimed = data.talent.filter(t => t.name.trim() !== '');

  // 1. Calculate Guarantees
  const pcdcGuarantee = Number(data.guarantee) || 0;
  const soundGuarantee = data.gearRental ? SOUND_GUARANTEE - GEAR_RENTAL : SOUND_GUARANTEE;
  const guarantees: Record<string, number> = {
    ...calculatePortions(pcdcGuarantee, talentTrimed),
    sound: calculatePortions(soundGuarantee, talentTrimed).sound
  };

  // 2. Add Travel & Guarantee to Talent
  const talent = talentTrimed.map((t) => ({
    ...t,
    travel: Number(t.travel) || 0,
    guarantee: guarantees[t.role],
  }));
  const totalTravel = talent.reduce((sum, t) => sum + t.travel, 0);
  const totalGuarantee = talent.reduce((sum, t) => sum + t.guarantee, 0);

  // 3. Calculate Pay Basis
  const payBasis = admissions - rent - totalTravel - totalGuarantee - pcdcGuarantee - (data.gearRental ? GEAR_RENTAL : 0);

  // 4. Calculate Shares
  let pcdcShare = 0;
  let shares: Record<string, number> = { sound: 0, caller: 0, musician: 0 };
  if (payBasis > 0) {
    const numCallers = talent.filter(t => t.role === 'caller').length;
    const numMusicians = talent.filter(t => t.role === 'musician').length;
    const numCallerShares = Math.min(MAX_SHARES_PER_ROLE.caller, numCallers);
    const numMusicianShares = Math.min(MAX_SHARES_PER_ROLE.musician, numMusicians);
    const numShares = numCallerShares + numMusicianShares + 1; // PCDC also gets one share

    pcdcShare = payBasis / numShares;
    shares = calculatePortions(pcdcShare, talent);
  }
  const talentWithShares = talent.map((t) => ({
    ...t,
    share: t.role === 'sound' ? 0 : Math.floor(shares[t.role])
  }));

  // 5. Calculate Total Pay
  const finalTalent: PersonCalculated[] = talentWithShares.map((t) => ({
    ...t,
    totalPay: t.travel + t.guarantee + t.share
  }));
  
  return {
    talent: finalTalent,
    payBasis,
    pcdcGuarantee,
    pcdcShare: Math.floor(pcdcShare),
    gearRental: data.gearRental ? GEAR_RENTAL : 0,
    totalTravel,
    totalGuarantee
  };
};
