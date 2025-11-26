import { useState, type MouseEvent } from 'react';
import { Popover, Typography, IconButton, Box, Table, TableBody, TableRow, TableCell } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const TravelAmountsPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={handleClick} onMouseDown={(e) => e.preventDefault()}>
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Travel Amounts
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$15</TableCell>
                <TableCell>Salem, Longview, Hood River (50 mi)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$20</TableCell>
                <TableCell>Corvallis, Astoria (85 mi)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$30</TableCell>
                <TableCell>Eugene, Newport, Olympia, Tacoma, Redmond (110 mi)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$40</TableCell>
                <TableCell>Seattle, Roseburg (170 mi)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$50</TableCell>
                <TableCell>Bellingham, Ashland, Friday Harbor (250-300 mi)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$60</TableCell>
                <TableCell>Spokane (350 mi)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>$70</TableCell>
                <TableCell>Vancouver BC (320 mi + border crossing)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Popover>
    </div>
  );
};
