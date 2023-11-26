import { createTheme } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';

import createBaseTheme from './baseTheme';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    page: string;
    activeHover: string;
    tables: string;
    divider: string;
    legend: string;
    backdrop: string;
    skeleton: string;
    outline: string;
    disabled: string;
    toolbar: string;
    search: string;
    statusPending: string;
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    bg?: string;
    medium?: string;
  }

  interface SimplePaletteColorOptions {
    bg?: string;
    medium?: string;
  }

  interface TypeText {
    white?: string;
  }
}

const palette = createPalette({
  mode: 'light',
  primary: {
    main: '#1976D2',
    bg: 'rgba(21, 101, 192, 0.1)',
    dark: '#1565C0',
    light: '#42A5F5',
  },
  secondary: {
    light: '#A8D9F3',
    main: '#45B5F3',
    dark: '#3598CF',
    bg: 'rgba(53, 152, 207, 0.2)',
    contrastText: '#fff',
  },
  background: {
    default: '#F4F4F4',
    page: '#F4F5F7',
    activeHover: '#DFF4FF',
    tables: 'rgba(0, 0, 0, 0.03)',
    divider: '#96BFE5',
    legend: 'rgba(0, 0, 0, 0.01)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
    skeleton: 'rgba(0, 0, 0, 0.06)',
    search: '#004798',
    statusPending: '#D9D9D9',
    outline: 'rgba(0, 0, 0, 0.23)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    toolbar: '#E5E5E5',
  },
  info: {
    main: '#0288D1',
    light: '#CCE7F6',
    medium: 'rgba(96, 174, 252, 0.5)',
  },
  text: {
    secondary: 'rgba(0, 0, 0, 0.6)',
    primary: 'rgba(0, 0, 0, 0.87)',
    disabled: 'rgba(0, 0, 0, 0.4)',
    white: '#fff',
  },
  error: {
    main: '#D32F2F',
    light: '#FFECE5',
    medium: 'rgba(255, 207, 204, 0.5)',
    dark: '#C62828',
  },
  warning: {
    main: '#ED6C02',
    light: '#FFFBE9',
    medium: 'rgba(255, 192, 140, 0.5)',
  },
  success: {
    main: '#2E7D32',
    dark: '#1B5E20',
    medium: 'rgba(220, 255, 147, 0.5)',
    light: '#F3FFDA',
  },
});

const defaultTheme = createTheme({
  ...createBaseTheme(palette),
  palette,
});

export default defaultTheme;
