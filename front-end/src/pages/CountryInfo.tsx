import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ICountryInfo } from '@/models/country';
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';

import PopulationChart from '@/components/Chart';
import Loader from '@/components/Loader';
import { routes } from '@/routes';

const CountryInfo = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [country, setCountry] = useState<ICountryInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const responce = await fetch(`${routes.API.BASE_URL}/countries/${countryCode}`);
        const { data } = await responce.json();
        setCountry(data);
        setIsLoading(false);
      } catch (err) {
        setError('smth went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, [countryCode]);
  console.log(country);

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
    <Box sx={{ padding: 4 }}>
      <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ marginBottom: 4 }}>
        Back to Home
      </Button>
      {country && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 4,
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
              {country.borderCountries.officialName}
            </Typography>
            {country.flag && (
              <img src={country.flag.flag} alt={`${country.borderCountries.officialName} Flag`} width={50} />
            )}
          </Box>

          <Card sx={{ marginTop: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Border Countries:
              </Typography>
              <List>
                {country.borderCountries.borders.map((borderCountry) => (
                  <ListItem
                    key={borderCountry.countryCode}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 253, 2, 0.5)',
                        cursor: 'pointer',
                      },
                    }}
                    component={Link}
                    to={`${routes.PUBLIC.COUNTRY}/${borderCountry.countryCode}`}
                  >
                    <ListItemText primary={borderCountry.officialName} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          {country.population && country.population.populationCounts && (
            <PopulationChart populationCounts={country.population.populationCounts} />
          )}
        </>
      )}
    </Box>
  );
};

export default CountryInfo;
