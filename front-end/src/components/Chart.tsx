import { PopulationCount } from '@/models/country';
import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const PopulationChart = ({ populationCounts }: { populationCounts: PopulationCount[] }) => {
  const years = populationCounts.map((pc) => pc.year);
  const populations = populationCounts.map((pc) => pc.value);

  return (
    <>
      <Typography variant="h3" sx={{ mt: 2 }}>
        Population
      </Typography>
      <Box
        sx={{
          width: '100%',
          overflow: 'auto',
        }}
      >
        <LineChart
          xAxis={[{ data: years }]}
          series={[
            {
              data: populations,
            },
          ]}
          sx={{
            width: '100%',
            height: 400,
          }}
          height={400}
        />
      </Box>
    </>
  );
};

export default PopulationChart;
