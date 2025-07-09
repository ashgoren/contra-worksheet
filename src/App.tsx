import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EventInfoSection } from './components/sections/EventInfoSection';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,    // Lower the md breakpoint from 900px to 800px
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EventInfoSection />
    </ThemeProvider>
  )
}

export default App;
