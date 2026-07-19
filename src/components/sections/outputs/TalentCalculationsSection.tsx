import { useState } from 'react';
import { Button, Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Tooltip } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SignatureDialog } from 'components/SignatureDialog';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';
import { useTalent } from 'hooks/useTalent';
import { useFinancials } from 'hooks/useFinancials';
import { useFinalCalculations } from 'hooks/useFinalCalculations';
import { useSignatures } from 'hooks/useSignatures';
import { useDataPersistence } from 'hooks/useDataPersistence';
import { SOUND_GUARANTEE, MAX_SHARES_PER_ROLE } from 'src/config';
import type { ReactNode } from 'react';
import type { PersonCalculated } from 'types/worksheet';

export const TalentCalculationsSection = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { gearRental, talent, payBasis, pcdcGuarantee, pcdcShare, totalTravel, totalGuarantee } = useTalent();
  const { rent, admissions } = useFinancials();
  const { totalTalentPay } = useFinalCalculations();

  const gearRentalNote = `Sound pay is $${SOUND_GUARANTEE} minus $${formatCurrency(gearRental)} gear rental`;

  const { addSignature } = useSignatures();
  const { saveBackup } = useDataPersistence();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<PersonCalculated | null>(null);

  const handleSignatureClick = (person: PersonCalculated) => {
    setCurrentPerson(person);
    setDialogOpen(true);
  };

  const handleSaveSignature = (signature: string) => {
    setDialogOpen(false);
    if (currentPerson) {
      addSignature(currentPerson, signature);
      saveBackup();
    }
  };

  if (!payBasis || !talent || talent.filter((p) => p.name).length === 0) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <SectionHeader title='Talent Pay' />
        <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
          Not enough data to calculate.
        </Typography>
      </Paper>
    )
  }

  const numCallers = talent.filter((t) => t.role === 'caller').length;
  const numMusicians = talent.filter((t) => t.role === 'musician').length;
  const numCallerShares = Math.min(MAX_SHARES_PER_ROLE.caller, numCallers);
  const numMusicianShares = Math.min(MAX_SHARES_PER_ROLE.musician, numMusicians);
  const numShares = numCallerShares + numMusicianShares + 1;
  const callerLabel = `${numCallerShares} caller${numCallers > MAX_SHARES_PER_ROLE.caller ? ' (max)' : ''}`;
  const musicianLabel = `${numMusicianShares} musician${numMusicians > MAX_SHARES_PER_ROLE.musician ? ' (max)' : ''}`;
  const sumOfTalentPay = talent.reduce((sum, t) => sum + (t.totalPay || 0), 0);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <SectionHeader title='Talent Pay' />

      <Box sx={{
        maxWidth: { xs: '100%', md: '735px' },
        border: '1px solid',
        borderRadius: 1
      }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ mt: 2 }}>
            <Typography variant='subtitle2' component='h3'>
              Click for detailed explanation and internal calculations...
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableBody>
                <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
                  Total pay for each caller and musician is calculated as the sum of their travel, guarantee, and share (if any).
                  The share is calculated as the pay basis divided by the number of shares (1 for PCDC + 1 for caller + 1 per musician up to {MAX_SHARES_PER_ROLE.musician}).
                  If there are more than {MAX_SHARES_PER_ROLE.musician} musicians, then {MAX_SHARES_PER_ROLE.musician} shares are split among all musicians, so each musician's share is reduced.
                </Typography>
                <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
                  The sound person's total pay is considered to be ${SOUND_GUARANTEE} + travel (if any), but their actual pay is reduced by the gear rental fee if they used our gear.
                </Typography>
                <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
                  These calculations are automatically reflected in the talent pay table below.
                </Typography>
                <SummaryTableRow
                  label='Pay Basis'
                  description={`${admissions} admissions - ${rent} rent - ${totalTravel} travel - ${totalGuarantee} talent guarantees - ${pcdcGuarantee} pcdc guarantee - ${gearRental} gear rental`}
                  value={payBasis}
                />
                <SummaryTableRow
                  label={`Base Share (does not include guarantee)`}
                  description={`${payBasis} pay basis ÷ ${numShares} shares (${callerLabel} + ${musicianLabel} + 1 pcdc)`}
                  value={pcdcShare}
                />
                <SummaryTableRow
                  label='Total Talent Pay'
                  description={`${sumOfTalentPay} total from below, but adding back in the gear rental fee (if applicable)`}
                  value={totalTalentPay}
                />
                <SummaryTableRow
                  label='PCDC cut'
                  description={`${pcdcGuarantee} guarantee + ${pcdcShare} share`}
                  value={(pcdcGuarantee ?? 0) + (pcdcShare ?? 0)}
                />
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </Box>

      {isXs ? (
        talent.map((person) => (
          <TalentRow key={person.name} person={person} gearRental={gearRental} gearRentalNote={gearRentalNote} isXs={true} onSignatureClick={handleSignatureClick} />
        ))
      ) : (
        <Box sx={{ mt: 2, maxWidth: { xs: '100%', md: '735px' }, border: '1px solid', borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Talent</TableCell>
                <TableCell>Travel</TableCell>
                <TableCell>+Guarantee</TableCell>
                <TableCell>+Share</TableCell>
                <TableCell>=Total</TableCell>
                <TableCell>Signature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {talent.map((person) => (
                <TalentRow key={person.name} person={person} gearRental={gearRental} gearRentalNote={gearRentalNote} isXs={false} onSignatureClick={handleSignatureClick} />
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {Boolean(gearRental) && (
        <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 1, px: 2 }}>
          * {gearRentalNote}
        </Typography>
      )}

      {/* <Typography variant='body2' sx={{ mt: { xs: 2, sm: 1 }, p: 2 }}>
        Note that PCDC also gets its own ${formatCurrency((pcdcGuarantee ?? 0) + (pcdcShare ?? 0))} cut (${formatCurrency(pcdcGuarantee)} guarantee + ${formatCurrency(pcdcShare)} share).
      </Typography> */}

      <SignatureDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveSignature}
        person={currentPerson}
      />

    </Paper>
  );
};

const TalentRow = ({person, gearRental, gearRentalNote, isXs, onSignatureClick}: {
  person: PersonCalculated;
  gearRental: number | null;
  gearRentalNote: string;
  isXs: boolean;
  onSignatureClick: (person: PersonCalculated) => void;
}) => {
  const { name, totalPay } = person;
  if (!name || !totalPay) return null;
  const nameWithRole = `${person.name} (${person.role})`;
  const travel = person.travel || '-';
  const showGearRentalNote = person.role === 'sound' && Boolean(gearRental);
  const guarantee = person.guarantee ? (
    <>
      {person.guarantee}
      {showGearRentalNote && (
        <Tooltip title={gearRentalNote}>
          <Box component='span' sx={{ cursor: 'default' }}>*</Box>
        </Tooltip>
      )}
    </>
  ) : '-';
  const share = person.share ? formatCurrency(person.share) : '-';
  const total = person.totalPay ? formatCurrency(person.totalPay) : '-';
  return isXs ? (
    <Box key={person.name} sx={{ mt: 2, border: '1px solid', borderRadius: 1, p: 2 }}>
      <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{nameWithRole}</Typography>
      <Typography variant='body1'>Travel: {travel}</Typography>
      <Typography variant='body1'>Guarantee: {guarantee}</Typography>
      <Typography variant='body1'>Share: {share}</Typography>
      <Typography variant='body1'>Total: {total}</Typography>
      <Box sx={{ mt: 1 }}>
        <SignField person={person} onSignatureClick={onSignatureClick} />
      </Box>
    </Box>
  ) : (
    <TableRow>
      <TableCell><Typography variant='body1'>{nameWithRole}</Typography></TableCell>
      <TableCell>{travel}</TableCell>
      <TableCell>{guarantee}</TableCell>
      <TableCell>{share}</TableCell>
      <TableCell>{total}</TableCell>
      <TableCell>
        <SignField person={person} onSignatureClick={onSignatureClick} />
      </TableCell>
    </TableRow>
  );
};

const SignField = ({ person, onSignatureClick }: {
  person: PersonCalculated;
  onSignatureClick: (person: PersonCalculated) => void;
}) => {
  return (
    <>
      {person.signature ?
        <Box
          onClick={() => onSignatureClick(person)}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            display: 'inline-block',
            '&:hover .signature-overlay': { opacity: 1 }
          }}
        >
          <img
            src={person.signature}
            style={{ maxWidth: '100%', maxHeight: '50px', display: 'block' }}
          />
          <Box
            className='signature-overlay'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s ease-in-out',
              borderRadius: 1,
            }}
          >
            <RedoIcon />
          </Box>
        </Box>
      :
        <Button variant='contained' color='primary' onClick={() => onSignatureClick(person)}>
          Sign
        </Button>
      }
    </>
  );
};

const SummaryTableRow = ({ label, value, description }: { label: string; value: number | null | undefined; description?: ReactNode }) => (
  <TableRow>
    <TableCell sx={{ borderBottom: 'none' }}>
      <Box>
        <Typography variant='body1'>{label}</Typography>
        {description && (
          <Typography variant='caption' color='text.secondary'>
            {description}
          </Typography>
        )}
      </Box>
    </TableCell>
    <TableCell align='right' sx={{ borderBottom: 'none', fontSize: '1.2rem', pr: { xs: 2, sm: 4 } }}>
      {formatCurrency(value)}
    </TableCell>
  </TableRow>
);
