import React from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Divider, useTheme
} from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { getWeatherIcon, getWeatherAnimationStyles, iconPulseAnimation } from '../utils/weatherIcons';

function CurrentWeatherCard({ current, geoLoc, unit }) {
  const theme = useTheme();

  if (!geoLoc) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="div" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.5rem' } }} color="text.primary">
        Current Weather in {geoLoc.name}, {geoLoc.country}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <Box sx={getWeatherAnimationStyles(current.condition.code, current.is_day)}>
          {current.condition.icon ? (
            <img
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              style={{ width: '70px', height: '70px', maxWidth: '100%', maxHeight: '100%', minWidth: 50, minHeight: 50 }}
            />
          ) : (
            getWeatherIcon(current.condition.code, current.is_day)
          )}
        </Box>
        <Typography variant="h2" component="span" sx={{ mt: 1, mb: 1, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem' } }} color="text.primary">
          {unit === 'celsius' ? `${current.temp_c}°C` : `${current.temp_f}°F`}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ fontStyle: 'italic', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {current.condition.text}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <OpacityIcon sx={{ mr: 1, color: '#42a5f5', ...iconPulseAnimation }} />
          <Typography variant="body1" color="text.primary">Humidity: {current.humidity}%</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <AirIcon sx={{ mr: 1, color: '#66bb6a', ...iconPulseAnimation }} />
          <Typography variant="body1" color="text.primary">Wind: {unit === 'celsius' ? `${current.wind_kph} kph` : `${current.wind_mph} mph`}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <LightModeIcon sx={{ mr: 1, color: '#ffeb3b', ...iconPulseAnimation }} />
          <Typography variant="body1" color="text.primary">UV Index: {current.uv}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <ThermostatIcon sx={{ mr: 1, color: '#ff7043', ...iconPulseAnimation }} />
          <Typography variant="body1" color="text.primary">Feels like: {unit === 'celsius' ? `${current.feelslike_c}°C` : `${current.feelslike_f}°F`}</Typography>
        </Grid>
        {current.air_quality && (
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }} color="text.primary">Air Quality Index (US EPA): {current.air_quality['us-epa-index']}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default CurrentWeatherCard; 