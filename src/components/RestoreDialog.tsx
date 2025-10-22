import { useConfirm } from 'material-ui-confirm';
import { Button, Box, Dialog, Typography } from '@mui/material';
import { formatDate } from 'utils';
import { useFormContext } from 'react-hook-form';
import type { WorksheetFormData, WorksheetBackup } from 'types/worksheet';

export const RestoreDialog = ({ open, onClose, backups, skipConfirm, setPage }: {
  open: boolean;
  onClose: () => void;
  backups: WorksheetBackup[];
  skipConfirm: boolean;
  setPage: (page: number | string) => void
}) => {
  const confirm = useConfirm();
  const { reset } = useFormContext<WorksheetFormData>();

  const handleRestoreBackup = async (backup: WorksheetBackup) => {
    onClose();
    const { confirmed } = skipConfirm ? { confirmed: true } : await confirm({
      title: 'Restore Backup?',
      description: <><strong style={{ color: 'red' }}>WARNING:</strong> This will replace all data in the current worksheet! Are you sure?</>
    });
    if (confirmed || skipConfirm) {
      localStorage.removeItem('worksheetData');
      const { updatedAt: _, ...formData } = backup; // strip updatedAt
      console.log('Restoring backup', formData);
      reset(formData);
      setPage(1);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
    >
      <Box sx={{
        my: 1,
        mx: 'auto',
        p: 2,
        width: { xs: '100%', sm: 535 },
        boxSizing: 'border-box'
      }}>
        <Typography variant='h6' gutterBottom>
          Restore Backup
        </Typography>
        <Box sx={{ mb: 2 }}>
          {backups.map((backup, index) => (
            <Button
              key={index}
              variant='outlined'
              fullWidth sx={{ justifyContent: 'space-between', my: 1.5, textTransform: 'none' }}
              onClick={ () => handleRestoreBackup(backup) }
            >
              <Typography variant='body1'>
                {backup.date} - {backup.band}
              </Typography>
              <Typography variant='body2'>
                {backup.updatedAt && `Updated ${formatDate(new Date(backup.updatedAt))}`}
              </Typography>
            </Button>
          ))}
        </Box>
        <Box display='flex' justifyContent='space-between' sx={{ mt: 1 }}>
          <Button variant='contained' color='info' onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
