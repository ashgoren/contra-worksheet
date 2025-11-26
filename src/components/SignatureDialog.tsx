import { useEffect, useRef, useState } from 'react';
import { Button, Box, Dialog, Typography } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { formatCurrency } from 'utils';
import type { PersonCalculated } from 'types/worksheet';

export const SignatureDialog = ({ open, onClose, onSave, person }: {
  open: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
  person: PersonCalculated | null;
}) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [empty, setEmpty] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(500);

  const clear = () => {
    sigCanvasRef.current?.clear();
    setEmpty(true);
  };

  useEffect(() => {
    if (!open) return;
    const node = containerRef.current;
    if (!node) return; 
    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect?.width; // content area width excluding padding
      if (+width > 0) {
        setCanvasWidth(width);
        setTimeout(() => { clear() }, 50); // timeout necsssary to reset bg color
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [open]);

  if (!person) return null;

  const save = () => {
    // const trimmedCanvas = sigCanvasRef?.current?.getTrimmedCanvas();
    // const signature = trimmedCanvas?.toDataURL('image/png');
    const signature = sigCanvasRef.current?.toDataURL('image/png');
    if (signature) {
      onSave(signature);
    } else {
      console.error('No signature to save');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
    >
      <Box ref={containerRef} sx={{
        my: 1,
        mx: 'auto',
        p: 2,
        width: { xs: '100%', sm: 535 },
        boxSizing: 'border-box'
      }}>
        <Typography variant='h6' gutterBottom>
          Signature for {person.name} ({person.role})
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
          Travel: ${person.travel}<br />
          Guarantee: ${person.guarantee}<br />
          Share: ${formatCurrency(person.share)}<br />
          Total Pay: ${formatCurrency(person.totalPay)}
        </Typography>

        <SignatureCanvas
          ref={sigCanvasRef}
          penColor='black'
          backgroundColor='#FAF9F6'
          canvasProps={{
            width: canvasWidth,
            height: 200,
            style: { border: '1px solid #000' }
          }}
          onEnd={() => setEmpty(false)}
          clearOnResize={false}
        />
        <Box display='flex' justifyContent='space-between' sx={{ mt: 1 }}>
          <Button variant='contained' color='warning' onClick={clear} disabled={empty}>Clear</Button>
          <Button variant='contained' color='success' onClick={save} disabled={empty}>Save</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
