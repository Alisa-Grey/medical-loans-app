import { createTheme } from '@mui/material/styles';
import shadows, { Shadows } from '@mui/material/styles/shadows';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    caption2: React.CSSProperties;
    subtitle: React.CSSProperties;
    buttonMini: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    caption2?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    buttonMini: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    caption2: true;
    subtitle: true;
    buttonMini: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Proxima',
    h1: {
      fontWeight: 700,
      fontSize: '36px',
      color: '#1F3B54',
    },
    h2: {
      marginBottom: '30px',
      fontWeight: 700,
      fontSize: '22px',
      color: '#1F3B54',
    },
    h6: {
      color: '#1F3B54',
    },
    caption: {
      fontSize: '13px',
      lineHeight: '18px',
      color: '#1F3B54',
    },
    caption2: {
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '18px',
      color: '#1F3B54',
    },
    body1: {
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '22px',
      color: '#1F3B54',
    },
    body2: {
      fontSize: '15px',
      lineHeight: '22px',
      color: '#595A94',
    },
    subtitle: {
      fontSize: '14px',
      color: '#1F3B54',
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '18px',
      color: '#B9BAD5',
    },
    buttonMini: {
      fontSize: '12px',
      color: '#1F3B54',
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: '#2FBB80',
      light: '#82E3BA',
    },
  },
  shadows: shadows.map(() => 'none') as Shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          fontWeight: 600,
        },
        contained: {
          padding: '12px 30px',
          color: 'white',
          backgroundColor: '#2FBB80',
          '&:hover': {
            color: 'white',
            backgroundColor: '#2FBB80',
            boxShadow: '0px 8px 16px rgba(76, 222, 143, 0.3)',
          },
          '&:active': {
            backgroundColor: '#82E3BA',
            boxShadow: 'none',
          },
          '&:disabled': {
            color: '#1F3B54',
            backgroundColor: '#B9BAD5',
          },
        },
        outlined: {
          padding: '10px 30px',
          color: '#0E117B',
          border: '1px solid #82E3BA',
          '&:hover': {
            border: '1px solid #82E3BA',
            backgroundColor: '#82E3BA',
          },
          '&:active': {
            color: '#FFF',
            backgroundColor: '#2FBB80',
          },
          '&:disabled': {
            color: '#B9BAD4',
            backgroundColor: '#FAFAFF',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          height: '13px',
          fontSize: '13px',
          lineHeight: '1.2',
          color: '#FB6E07',
          marginBottom: '14px',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          flexDirection: 'column-reverse',
          alignItems: 'flex-start',
        },
        label: {
          color: '#1F3B54',
          '&.Mui-active': {
            color: '#0E117B',
          },
          '&.Mui-completed': {
            color: '#595A94',
          },
        },
        labelContainer: {
          color: '#1F3B54',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: '10px',
          paddingBottom: '9px',
        },
        notchedOutline: {
          border: '1px solid #B9BAD5',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingRight: '9px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '42px',
          height: '42px',
          fontWeight: 700,
          fontSize: '22px',
          color: '#FFF',
          backgroundColor: '#82E3BA',
        },
      },
    },
  },
});
