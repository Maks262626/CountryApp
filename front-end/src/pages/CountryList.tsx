import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Country } from '@/models/country';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import Loader from '@/components/Loader';
import { routes } from '@/routes';

const CountryList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const responce = await fetch(`${routes.API.BASE_URL}/countries`);
        const { data } = await responce.json();
        setCountries(data);
        setIsLoading(false);
      } catch (err) {
        setError('smth went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryClick = (countryCode: string) => {
    navigate(`${routes.PUBLIC.COUNTRY}/${countryCode}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Typography variant="h4" gutterBottom sx={{ pt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ pt: 4 }}>
        Country List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Country Code</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow
                onClick={() => {
                  handleCountryClick(country.countryCode);
                }}
                key={country.countryCode}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 253, 2,.5)',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell>{country.countryCode}</TableCell>
                <TableCell>{country.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default CountryList;
