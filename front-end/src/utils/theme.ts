import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFD02',
    },
    secondary: {
      main: '#1A1A1A',
    },
    background: {
      default: '#FAFAFA',
      paper: '#282828',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#FFFD02',
    },
    action: {
      disabledBackground: 'rgba(255, 253, 2, 0.3)',
      disabled: 'rgba(255, 253, 2, 0.7)',
    },
  },
});

export default darkTheme;
