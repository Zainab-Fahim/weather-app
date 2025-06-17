import React from 'react';
import {
  Card, CardContent, Typography, Grid, useTheme
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

const iconPulseAnimation = {
  animation: 'iconSubtlePulse 1.5s infinite alternate',
  '@keyframes iconSubtlePulse': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.03)' },
  },
};

function AstronomyCard({ astronomyData }) {
  const theme = useTheme();

  return (
    <Card sx={{ width: '100%', maxWidth: 600, mb: { xs: 3, md: 4 }, p: { xs: 2, md: 3 }, boxShadow: 3, borderRadius: 2, bgcolor: theme.palette.background.paper }}>
      <CardContent>
        <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }} color="text.primary">Astronomy</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <WbSunnyIcon sx={{ mr: 1, color: '#FFD700', ...iconPulseAnimation }} />
            <Typography variant="body1" color="text.primary">Sunrise: {astronomyData.sunrise}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <WbTwilightIcon sx={{ mr: 1, color: '#FF8C00', ...iconPulseAnimation }} />
            <Typography variant="body1" color="text.primary">Sunset: {astronomyData.sunset}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" color="text.primary">Moonrise: {astronomyData.moonrise}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" color="text.primary">Moonset: {astronomyData.moonset}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ mt: 1 }} color="text.primary">Moon Phase: <Typography component="span" fontWeight="bold" color="text.primary">{astronomyData.moon_phase}</Typography></Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AstronomyCard; 