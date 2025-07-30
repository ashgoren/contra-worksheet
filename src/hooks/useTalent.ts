import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useFinancials } from 'hooks/useFinancials';
import { isNum } from 'utils';
import { SOUND_GUARANTEE, GEAR_RENTAL, MAX_SHARES_PER_ROLE } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

export const useTalent = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const { admissions, miscExpenses } = useFinancials();

  const [rawTalent, rawGuarantee, rawRent, gearRental] = useWatch({
    name: ['talent', 'guarantee', 'rent', 'gearRental'],
    control
  });

  const rent = useMemo(() => Number(rawRent) || 0, [rawRent]);
  const guarantee = useMemo(() => Number(rawGuarantee) || 0, [rawGuarantee]);

  const baseSoundGuarantee = useMemo(() => gearRental ? SOUND_GUARANTEE - GEAR_RENTAL : SOUND_GUARANTEE, [gearRental]);

  const guarantees: Record<string, number> = useMemo(() => ({
    ...calculatePortions(guarantee, rawTalent),
    sound: calculatePortions(baseSoundGuarantee, rawTalent).sound
  }), [guarantee, rawTalent, baseSoundGuarantee]);

  const talent = useMemo(() => rawTalent.map((t) => ({
    name: t.name,
    role: t.role,
    travel: Number(t.travel) || 0,
    guarantee: guarantees[t.role],
    share: null, // will be calculated later
    totalPay: null // will be calculated later
  })), [rawTalent, guarantees]);

  const result = useMemo(() => {
    const totalTravel = talent.reduce((sum, t) => sum + t.travel, 0);
    const totalGuarantee = talent.reduce((sum, t) => sum + t.guarantee, 0) + guarantee; // include PCDC's 90

    const payBasis =
      isNum(admissions) && isNum(miscExpenses) && isNum(rent) && isNum(totalGuarantee) && isNum(totalTravel)
        ? admissions - rent - miscExpenses - totalGuarantee - totalTravel
        : null;

    if (!isNum(payBasis)) { // not yet ready to calculate things
      console.log('useTalent: payBasis is not a number');
      return {
        talent,
        payBasis: null,
        talentShare: null
      };
    }

    if (payBasis <= 0) { // no shares
      console.log('useTalent: payBasis is zero or negative');
      return {
        talent: talent.map(t => ({
          ...t,
          share: 0,
          totalPay: t.travel + t.guarantee
        })),
        payBasis,
        talentShare: 0
      };
    }

    // at this point we know payBasis is a positive number, which means share below is guaranteed to be a positive number too

    const numCallerShares = Math.min(MAX_SHARES_PER_ROLE.caller, talent.filter(t => t.role === 'caller').length);
    const numMusicianShares = Math.min(MAX_SHARES_PER_ROLE.musician, talent.filter(t => t.role === 'musician').length);
    const numShares = numCallerShares + numMusicianShares + 1; // pcdc gets a share too
    const pcdcShare = payBasis / numShares;
    console.log('pcdcShare', pcdcShare, 'numShares', numShares, 'payBasis', payBasis);
    const shares: Record<string, number> = calculatePortions(pcdcShare, talent);

    const talentWithShares = talent.map((t) => {
      const share = t.role === 'sound' ? 0 : shares[t.role];
      const totalPay = t.travel + t.guarantee + share;
      return {
        ...t,
        share,
        totalPay
      };
    });

    return {
      talent: talentWithShares,
      payBasis,
      pcdcShare
    };
  }, [talent, admissions, miscExpenses, rent, guarantee]);

  return result;
};

const calculatePortions = (amount: number, talent: { role: string }[]) => {
  const roles = ['sound', 'caller', 'musician'];
  return roles.reduce((acc, role) => {
    const numPeople = talent.filter(t => t.role === role).length;
    const maxShares = MAX_SHARES_PER_ROLE[role];
    return { ...acc, [role]: numPeople <= maxShares ? amount : amount * maxShares / numPeople };
  }, {} as Record<'sound' | 'caller' | 'musician', number>);
};
