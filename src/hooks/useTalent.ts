import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useFinancials } from 'hooks/useFinancials';
import { isNum } from 'utils';
import { SOUND_GUARANTEE, GEAR_RENTAL, MAX_SHARES_PER_ROLE } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

export const useTalent = () => {
  // 1. Parse Raw Values
  const { control } = useFormContext<WorksheetFormData>();
  const { admissions, miscExpenses } = useFinancials();
  const [rawTalent, rawGuarantee, rawRent, gearRental] = useWatch({
    name: ['talent', 'guarantee', 'rent', 'gearRental'],
    control
  });
  const rent = useMemo(() => Number(rawRent) || 0, [rawRent]);
  const pcdcGuarantee = useMemo(() => Number(rawGuarantee) || 0, [rawGuarantee]);
  const talent = useMemo(() => rawTalent.map((t) => ({
    ...t,
    travel: Number(t.travel) || 0
  })), [rawTalent]);

  // 2. Calculate Guarantees
  const guarantees = useTalentGuarantees(talent, pcdcGuarantee, gearRental);
  const talentWithGuarantees = useMemo(() => talent.map((t) => ({
    ...t,
    guarantee: guarantees[t.role],
  })), [talent, guarantees]);

  // 3. Calculate Pay Basis
  const payBasis = usePayBasis(talentWithGuarantees, admissions, miscExpenses, rent, pcdcGuarantee);

  // 4. Calculate Shares
  const { pcdcShare, shares } = useTalentShares(talentWithGuarantees, payBasis);
  const talentWithShares = useMemo(() => talentWithGuarantees.map((t) => ({
    ...t,
    share: t.role === 'sound' ? 0 : shares[t.role]
  })), [talentWithGuarantees, shares]);

  // 5. Calculate Total Pay
  const finalTalent = useMemo(() => talentWithShares.map((t) => ({
    ...t,
    totalPay: t.travel + t.guarantee + t.share
  })), [talentWithShares]);

  return {
    talent: finalTalent,
    payBasis,
    pcdcShare
  };
};

const useTalentGuarantees = (
  talent: { role: string }[],
  guarantee: number,
  gearRental: boolean
): Record<string, number> => {
  const baseSoundGuarantee = useMemo(() => gearRental ? SOUND_GUARANTEE - GEAR_RENTAL : SOUND_GUARANTEE, [gearRental]);
  const guarantees: Record<string, number> = useMemo(() => ({
    ...calculatePortions(guarantee, talent),
    sound: calculatePortions(baseSoundGuarantee, talent).sound
  }), [talent, guarantee, baseSoundGuarantee]);
  return guarantees;
};

const usePayBasis = (
  talent: { travel: number, guarantee: number }[],
  admissions: number | null,
  miscExpenses: number,
  rent: number,
  pcdcGuarantee: number
): number | null => {
  return useMemo(() => {
    if (!isNum(admissions)) return null;

    const totalTravel = talent.reduce((sum, t) => sum + t.travel, 0);
    const totalGuarantee = talent.reduce((sum, t) => sum + t.guarantee, 0) + pcdcGuarantee; // PCDC also gets a 90 guarantee

    return admissions - rent - miscExpenses - totalGuarantee - totalTravel;
  }, [talent, admissions, miscExpenses, rent, pcdcGuarantee]);
};

const useTalentShares = (
  talent: { role: string }[],
  payBasis: number | null
): { pcdcShare: number | null, shares: Record<string, number> } => {
  return useMemo(() => {
    if (payBasis === null) return { pcdcShare: null, shares: {} };
    if (payBasis <= 0) { return { pcdcShare: 0, shares: { sound: 0, caller: 0, musician: 0 } }; }

    const numCallers = talent.filter(t => t.role === 'caller').length;
    const numMusicians = talent.filter(t => t.role === 'musician').length;
    const numCallerShares = Math.min(MAX_SHARES_PER_ROLE.caller, numCallers);
    const numMusicianShares = Math.min(MAX_SHARES_PER_ROLE.musician, numMusicians);
    const numShares = numCallerShares + numMusicianShares + 1; // PCDC also gets one share

    const pcdcShare = payBasis / numShares;
    const shares: Record<string, number> = calculatePortions(pcdcShare, talent);

    return { pcdcShare, shares };
  }, [payBasis, talent]);
};

const calculatePortions = (amount: number, talent: { role: string }[]) => {
  const roles = ['sound', 'caller', 'musician'];
  return roles.reduce((acc, role) => {
    const numPeople = talent.filter(t => t.role === role).length;
    const maxShares = MAX_SHARES_PER_ROLE[role];
    return { ...acc, [role]: numPeople <= maxShares ? amount : amount * maxShares / numPeople };
  }, {} as Record<'sound' | 'caller' | 'musician', number>);
};
