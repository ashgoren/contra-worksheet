import { useState } from 'react';
import { Button, Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, useMediaQuery, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SignatureDialog } from 'components/SignatureDialog';
import { SectionHeader } from 'ui';
import { formatCurrency } from 'utils';
import { useTalent } from 'hooks/useTalent';
import { useFinancials } from 'hooks/useFinancials';
import { useSignatures } from 'hooks/useSignatures';
import { useDataPersistence } from 'hooks/useDataPersistence';
import type { ReactNode } from 'react';
import type { PersonCalculated } from 'types/worksheet';

export const TalentCalculationsSection = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { gearRental, talent, payBasis, pcdcGuarantee, pcdcShare, totalTravel, totalGuarantee } = useTalent();
  const { rent, admissions } = useFinancials();

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
              Internal Calculations
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableBody>
                <SummaryTableRow label='Pay Basis' description={`${admissions} admissions - ${rent} rent - ${totalTravel} travel - ${totalGuarantee} talent guarantees - ${pcdcGuarantee} pcdc guarantee - ${gearRental} gear rental`} value={payBasis} />
                <SummaryTableRow label='Share' description={<>based on pay basis and number of talent</>} value={pcdcShare} />
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </Box>

      {isXs ? (
        talent.map((person) => (
          <TalentRow key={person.name} person={person} isXs={true} onSignatureClick={handleSignatureClick} />
        ))
      ) : (
        <Box sx={{ mt: 2, maxWidth: { xs: '100%', md: '735px' }, border: '1px solid', borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Talent</TableCell>
                <TableCell>Travel</TableCell>
                <TableCell>Guarantee</TableCell>
                <TableCell>Share</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Signature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {talent.map((person) => (
                <TalentRow key={person.name} person={person} isXs={false} onSignatureClick={handleSignatureClick} />
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Typography variant='body2' sx={{ mt: { xs: 2, sm: 1 }, p: 2, fontStyle: 'italic' }}>
        PCDC: {formatCurrency(pcdcGuarantee)} guarantee, {formatCurrency(pcdcShare)} share
      </Typography>

      <SignatureDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveSignature}
        person={currentPerson}
      />

    </Paper>
  );
};

const TalentRow = ({person, isXs, onSignatureClick}: {
  person: PersonCalculated;
  isXs: boolean;
  onSignatureClick: (person: PersonCalculated) => void;
}) => {
  const { name, totalPay } = person;
  if (!name || !totalPay) return null;
  const nameWithRole = `${person.name} (${person.role})`;
  const travel = person.travel || '-';
  const guarantee = person.guarantee || '-';
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
