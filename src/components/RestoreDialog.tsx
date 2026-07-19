import { Fragment } from 'react';
import { Button, Box, Dialog, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { formatDate, formatDateUTC } from 'utils';
import type { WorksheetBackup } from 'types/worksheet';

export const RestoreDialog = ({ open, onClose, backups, onRestoreBackup, onDeleteBackup }: {
  open: boolean;
  onClose: () => void;
  backups: WorksheetBackup[];
  onRestoreBackup: (backup: WorksheetBackup) => void;
  onDeleteBackup: (backup: WorksheetBackup) => void;
}) => {
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
        <List disablePadding sx={{ mb: 2 }}>
          {backups.map((backup, index) => {
            const eventDate = formatDateUTC(new Date(backup.date));
            const editedDate = backup.updatedAt ? formatDate(new Date(backup.updatedAt)) : null;
            const showEdited = editedDate && editedDate !== eventDate;

            return (
              <Fragment key={backup.sessionId}>
                {index > 0 && <Divider component='li' />}
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton aria-label='Delete backup' color='error' onClick={() => onDeleteBackup(backup)}>
                      <DeleteOutline />
                    </IconButton>
                  }
                >
                  <ListItemButton onClick={() => onRestoreBackup(backup)} sx={{ borderRadius: 1 }}>
                    <ListItemText
                      primary={backup.band || '(no band name)'}
                      secondary={
                        <><strong>{eventDate}</strong>{showEdited ? ` (updated ${editedDate})` : ''}</>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
        <Box display='flex' justifyContent='space-between' sx={{ mt: 1 }}>
          <Button variant='contained' color='info' onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
