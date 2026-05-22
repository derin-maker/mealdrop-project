import { createTheme } from '@mui/material/styles'

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#E63946',
      light: '#FF6B6B',
      dark: '#C1121F',
    },
    secondary: {
      main: '#F4A261',
      light: '#F9C784',
      dark: '#E07B39',
    },
    background: {
      default: mode === 'light' ? '#F8F8F8' : '#0D0D0D',
      paper: mode === 'light' ? '#FFFFFF' : '#1A1A1A',
    },
    text: {
      primary: mode === 'light' ? '#1A1A1A' : '#F8F8F8',
      secondary: mode === 'light' ? '#6B6B6B' : '#A0A0A0',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #E63946 0%, #F4A261 100%)',
          boxShadow: '0 4px 15px rgba(230, 57, 70, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #C1121F 0%, #E07B39 100%)',
            boxShadow: '0 6px 20px rgba(230, 57, 70, 0.45)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: mode === 'light'
            ? '0 2px 16px rgba(0,0,0,0.08)'
            : '0 2px 16px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          fontWeight: 600,
        },
      },
    },
  },
})