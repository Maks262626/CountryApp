import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import CountryInfo from './pages/CountryInfo';
import CountryList from './pages/CountryList';
import { routes } from './routes';

function App() {
  return (
    <Box sx={{ height: '100dvh', overflowY: 'auto', position: 'relative', backgroundColor: 'secondary.main' }}>
      <Routes>
        <Route path={routes.PUBLIC.HOME} element={<CountryList />} />
        <Route path={`${routes.PUBLIC.COUNTRY}/:countryCode`} element={<CountryInfo />} />
      </Routes>
    </Box>
  );
}

export default App;
