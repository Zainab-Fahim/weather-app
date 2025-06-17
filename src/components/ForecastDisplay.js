import React from 'react';
import {
  Card, CardContent, Typography, Box, Grid, IconButton, Collapse, useTheme
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
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

const iconPulseAnimation = {
  animation: 'iconSubtlePulse 1.5s infinite alternate',
  '@keyframes iconSubtlePulse': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.03)' },
  },
};

function ForecastDisplay({ forecastData, unit, expandedDay, handleExpandClick }) {
  const theme = useTheme();

  if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 900, overflowX: 'auto', pb: 1 }} display="flex" flexDirection="row" justifyContent={{ xs: 'flex-start', sm: 'space-around' }}>
      {forecastData.forecast.forecastday.map((day) => (
        <Grid item xs={12} sm={4} key={day.date} sx={{ textAlign: 'center', p: 1, flexShrink: 0, width: { xs: '380px', sm: 'auto' } }}>
          <Card
            variant="outlined"
            sx={{ cursor: 'pointer', bgcolor: theme.palette.background.default, borderRadius: 2, p: 2, transition: 'background-color 0.3s',
                  '&:hover': { bgcolor: theme.palette.action.hover } }}
            onClick={() => handleExpandClick(day.date)}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short', day: 'numeric', month: 'long'
                })}
              </Typography>
              {day.day.condition.icon ? (
                <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} style={{ width: '60px', height: '60px' }} />
              ) : (
                getWeatherIcon(day.day.condition.code, 1)
              )}
              <Typography variant="body2" sx={{ mt: 0.5, mb: 0.5 }} color="text.primary">{day.day.condition.text}</Typography>
              <Typography variant="body2" color="text.primary">High: <Typography component="span" fontWeight="bold" color="text.primary">{unit === 'celsius' ? `${day.day.maxtemp_c}°C` : `${day.day.maxtemp_f}°F`}</Typography></Typography>
              <Typography variant="body2" color="text.primary">Low: <Typography component="span" fontWeight="bold" color="text.primary">{unit === 'celsius' ? `${day.day.mintemp_c}°C` : `${day.day.mintemp_f}°F`}</Typography></Typography>

              <IconButton size="small" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                {expandedDay === day.date ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>

              <Collapse in={expandedDay === day.date} timeout="auto" unmountOnExit>
                <Box mt={2}>
                  <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <WaterDropIcon sx={{ mr: 1, color: '#42a5f5', ...iconPulseAnimation }} />Chance of Rain: {day.day.daily_chance_of_rain}%
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <OpacityIcon sx={{ mr: 1, color: '#42a5f5', ...iconPulseAnimation }} />Avg Humidity: {day.day.avghumidity}%
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <AirIcon sx={{ mr: 1, color: '#66bb6a', ...iconPulseAnimation }} />Wind: {unit === 'celsius' ? `${day.day.maxwind_kph} kph` : `${day.day.maxwind_mph} mph`}, {day.day.wind_dir}
                  </Typography>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Box>
  );
}

export default ForecastDisplay; 