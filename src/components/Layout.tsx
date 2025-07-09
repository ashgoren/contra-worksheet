import { useState, type ReactNode } from 'react';
import { createTheme, ThemeProvider, type Theme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { USE_SYSTEM_COLOR_MODE } from 'src/Config';

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 800,
    lg: 1200,
    xl: 1536,
  },
};

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(USE_SYSTEM_COLOR_MODE && prefersDarkMode ? 'dark' : 'light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
    },
    breakpoints,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {USE_SYSTEM_COLOR_MODE && <ColorModeToggle theme={theme} toggleColorMode={toggleColorMode} />}
      {children}
    </ThemeProvider>
  );
}

interface ColorModeToggleProps {
  theme: Theme;
  toggleColorMode: () => void;
}

const ColorModeToggle = ({ theme, toggleColorMode }: ColorModeToggleProps) => {
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color='inherit'>
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}