import React from 'react';
import {
  Card, CardContent, Typography, Grid, useTheme, Box
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { iconPulseAnimation } from '../utils/weatherIcons';

function AstronomyCard({ astronomyData }) {
  const theme = useTheme();

  if (!astronomyData) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }} color="text.primary">Astronomy</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <WbSunnyIcon sx={{ mr: 1, color: '#FFD700', fontSize: { xs: 22, sm: 28 }, ...iconPulseAnimation }} />
          <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>Sunrise: {astronomyData.sunrise}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <WbTwilightIcon sx={{ mr: 1, color: '#FF8C00', fontSize: { xs: 22, sm: 28 }, ...iconPulseAnimation }} />
          <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>Sunset: {astronomyData.sunset}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>Moonrise: {astronomyData.moonrise}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>Moonset: {astronomyData.moonset}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: '0.95rem', sm: '1rem' } }} color="text.primary">Moon Phase: <Typography component="span" fontWeight="bold" color="text.primary">{astronomyData.moon_phase}</Typography></Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AstronomyCard; 