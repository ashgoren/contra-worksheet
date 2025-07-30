import { useFormContext, useWatch } from 'react-hook-form';
import { useFinancials } from 'hooks/useFinancials';
import { isNum } from 'utils';
import { SOUND_GUARANTEE, GEAR_RENTAL } from 'src/config';
import type { WorksheetFormData } from 'types/worksheet';

const maxSharesPerRole: Record<string, number> = {
  sound: 1,
  caller: 1,
  musician: 4
}

export const useTalent = () => {
  const { control } = useFormContext<WorksheetFormData>();
  const { admissions, miscExpenses } = useFinancials();

  const [rawTalent, rawGuarantee, rawRent, gearRental] = useWatch({
    name: ['talent', 'guarantee', 'rent', 'gearRental'],
    control
  });

  const rent = Number(rawRent) || 0;
  const guarantee = Number(rawGuarantee) || 0;

  const baseSoundGuarantee = gearRental ? SOUND_GUARANTEE - GEAR_RENTAL : SOUND_GUARANTEE;
  const guarantees: Record<string, number> = {
    ...calculatePortions(guarantee, rawTalent),
    sound: calculatePortions(baseSoundGuarantee, rawTalent).sound
  }

  const talent = rawTalent.map((t) => ({
    name: t.name,
    role: t.role,
    travel: Number(t.travel) || 0,
    guarantee: guarantees[t.role],
    share: null, // will be calculated later
    totalPay: null // will be calculated later
  }));

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

  const numCallerShares = Math.min(maxSharesPerRole.caller, talent.filter(t => t.role === 'caller').length);
  const numMusicianShares = Math.min(maxSharesPerRole.musician, talent.filter(t => t.role === 'musician').length);
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

  // console.log('useTalent: talentWithShares', talentWithShares);

  return {
    talent: talentWithShares,
    payBasis,
    pcdcShare
  };
};

const calculatePortions = (amount: number, talent: { role: string }[]) => {
  const roles = ['sound', 'caller', 'musician'];
  return roles.reduce((acc, role) => {
    const numPeople = talent.filter(t => t.role === role).length;
    const maxShares = maxSharesPerRole[role];
    return { ...acc, [role]: numPeople <= maxShares ? amount : amount * maxShares / numPeople };
  }, {} as Record<'sound' | 'caller' | 'musician', number>);
};
