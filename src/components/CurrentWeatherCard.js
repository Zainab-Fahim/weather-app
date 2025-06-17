import React from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Divider, useTheme
} from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import DehazeIcon from '@mui/icons-material/Dehaze';

const getWeatherIcon = (conditionCode, isDay) => {
  const iconMap = {
    1000: isDay ? <WbSunnyIcon sx={{ fontSize: 60, color: '#FFD700' }} /> : <AcUnitIcon sx={{ fontSize: 60, color: '#B0C4DE' }} />,
    1003: <CloudIcon sx={{ fontSize: 60, color: '#B0C4DE' }} />,
    1006: <CloudIcon sx={{ fontSize: 60, color: '#778899' }} />,
    1009: <CloudIcon sx={{ fontSize: 60, color: '#778899' }} />,
    1030: <DehazeIcon sx={{ fontSize: 60, color: '#A9A9A9' }} />,
    1135: <DehazeIcon sx={{ fontSize: 60, color: '#696969' }} />,
    1147: <DehazeIcon sx={{ fontSize: 60, color: '#4682B4' }} />,
    1063: <UmbrellaIcon sx={{ fontSize: 60, color: '#87CEEB' }} />,
    1180: <UmbrellaIcon sx={{ fontSize: 60, color: '#87CEEB' }} />,
    1183: <UmbrellaIcon sx={{ fontSize: 60, color: '#6495ED' }} />,
    1186: <UmbrellaIcon sx={{ fontSize: 60, color: '#4682B4' }} />,
    1189: <UmbrellaIcon sx={{ fontSize: 60, color: '#4169E1' }} />,
    1192: <UmbrellaIcon sx={{ fontSize: 60, color: '#0000CD' }} />,
    1195: <UmbrellaIcon sx={{ fontSize: 60, color: '#00008B' }} />,
    1210: <AcUnitIcon sx={{ fontSize: 60, color: '#F0F8FF' }} />,
    1213: <AcUnitIcon sx={{ fontSize: 60, color: '#F0F8FF' }} />,
    1216: <AcUnitIcon sx={{ fontSize: 60, color: '#E0FFFF' }} />,
    1219: <AcUnitIcon sx={{ fontSize: 60, color: '#ADD8E6' }} />,
    1222: <AcUnitIcon sx={{ fontSize: 60, color: '#B0E0E6' }} />,
    1225: <AcUnitIcon sx={{ fontSize: 60, color: '#87CEFA' }} />,
    1087: <ThunderstormIcon sx={{ fontSize: 60, color: '#6A5ACD' }} />,
    1279: <ThunderstormIcon sx={{ fontSize: 60, color: '#483D8B' }} />,
    1282: <ThunderstormIcon sx={{ fontSize: 60, color: '#191970' }} />,
    default: <WbSunnyIcon sx={{ fontSize: 60, color: '#FFD700' }} />,
  };
  return iconMap[conditionCode] || iconMap.default;
};

const getWeatherAnimationStyles = (conditionCode, isDay) => {
  // Clear / Sunny
  if (conditionCode === 1000) {
    return {
      animation: 'sunPulse 2s infinite alternate',
      '@keyframes sunPulse': {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(1.05)' },
      },
    };
  }
  // Cloudy conditions (1003: Partly cloudy, 1006: Cloudy, 1009: Overcast, 1030: Mist, 1135: Fog, 1147: Freezing fog)
  if ([1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)) {
    return {
      animation: 'cloudDrift 8s ease-in-out infinite alternate',
      '@keyframes cloudDrift': {
        '0%': { transform: 'translateX(0px)' },
        '100%': { transform: 'translateX(10px)' },
      },
    };
  }
  // Rainy conditions (1063: Patchy light drizzle, 1180: Patchy light rain, etc.)
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(conditionCode)) {
    return {
      animation: 'rainBob 0.8s infinite alternate',
      '@keyframes rainBob': {
        '0%': { transform: 'translateY(0px)' },
        '100%': { transform: 'translateY(5px)' },
      },
    };
  }
  // Default (subtle pulse for other conditions)
  return {
    animation: 'subtlePulse 1.5s infinite alternate',
    '@keyframes subtlePulse': {
      '0%': { transform: 'scale(1)' },
      '100%': { transform: 'scale(1.02)' },
    },
  };
};

const iconPulseAnimation = {
  animation: 'iconSubtlePulse 1.5s infinite alternate',
  '@keyframes iconSubtlePulse': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.03)' },
  },
};

function CurrentWeatherCard({ current, geoLoc, unit }) {
  const theme = useTheme();

  return (
    <Card sx={{ width: '100%', maxWidth: 600, mb: { xs: 3, md: 4 }, p: { xs: 2, md: 3 }, boxShadow: 3, borderRadius: 2, bgcolor: theme.palette.background.paper }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom align="center" sx={{ fontWeight: 'bold' }} color="text.primary">
          Current Weather in {geoLoc.name}, {geoLoc.country}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <Box sx={getWeatherAnimationStyles(current.condition.code, current.is_day)}>
            {current.condition.icon ? (
              <img
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
              getWeatherIcon(current.condition.code, current.is_day)
            )}
          </Box>
          <Typography variant="h2" component="span" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }} color="text.primary">
            {unit === 'celsius' ? `${current.temp_c}°C` : `${current.temp_f}°F`}
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ fontStyle: 'italic' }}>
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
      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCard; 