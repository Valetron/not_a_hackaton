import { createTheme, Palette } from '@mui/material';

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    info: true;
  }
}

const baseTheme = (palette: Palette) =>
  createTheme({
    palette,
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            'top': '-12px',
            '&.Mui-focused': {
              color: palette.secondary.main,
            },
            'fontSize': '0.875rem',
          },
          sizeSmall: {
            top: '-5px',
          },
          shrink: {
            top: 0,
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          outlined: {
            height: '30px',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline legend': {
              fontSize: '0.63em',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.secondary.main,
            },
          },
          input: {
            padding: '0 14px',
            fontSize: '0.875rem',
            height: '30px',
          },
          multiline: {
            padding: 0,
            minHeight: '30px',
            color: palette.text.primary,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          sizeSmall: {
            '&& .MuiOutlinedInput-notchedOutline legend': {
              fontSize: '0.75em',
            },
            'padding': '0 !important',
            'fontSize': '0.875rem',
          },
          inputSizeSmall: {
            padding: '0 !important',
          },
          root: {
            '&:has(> input:-webkit-autofill)': {
              backgroundColor: 'rgb(232, 240, 254)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
          },
        },
      },
    },
  });

export default baseTheme;
