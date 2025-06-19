import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import DehazeIcon from '@mui/icons-material/Dehaze';

export const getWeatherIcon = (conditionCode, isDay) => {
  const iconMap = {
    1000: isDay ? <WbSunnyIcon sx={{ fontSize: 60, color: '#FFD700' }} /> : <AcUnitIcon sx={{ fontSize: 60, color: '#B0C4DE' }} />, // Sunny or Clear
    1003: <CloudIcon sx={{ fontSize: 60, color: '#B0C4DE' }} />, // Partly cloudy
    1006: <CloudIcon sx={{ fontSize: 60, color: '#778899' }} />, // Cloudy
    1009: <CloudIcon sx={{ fontSize: 60, color: '#778899' }} />, // Overcast
    1030: <DehazeIcon sx={{ fontSize: 60, color: '#A9A9A9' }} />, // Mist
    1135: <DehazeIcon sx={{ fontSize: 60, color: '#696969' }} />, // Fog
    1147: <DehazeIcon sx={{ fontSize: 60, color: '#4682B4' }} />, // Freezing fog
    1063: <UmbrellaIcon sx={{ fontSize: 60, color: '#87CEEB' }} />, // Patchy rain
    1180: <UmbrellaIcon sx={{ fontSize: 60, color: '#87CEEB' }} />,
    1183: <UmbrellaIcon sx={{ fontSize: 60, color: '#6495ED' }} />,
    1186: <UmbrellaIcon sx={{ fontSize: 60, color: '#4682B4' }} />,
    1189: <UmbrellaIcon sx={{ fontSize: 60, color: '#4169E1' }} />,
    1192: <UmbrellaIcon sx={{ fontSize: 60, color: '#0000CD' }} />,
    1195: <UmbrellaIcon sx={{ fontSize: 60, color: '#00008B' }} />,
    1210: <AcUnitIcon sx={{ fontSize: 60, color: '#F0F8FF' }} />, // Snow
    1213: <AcUnitIcon sx={{ fontSize: 60, color: '#F0F8FF' }} />,
    1216: <AcUnitIcon sx={{ fontSize: 60, color: '#E0FFFF' }} />,
    1219: <AcUnitIcon sx={{ fontSize: 60, color: '#ADD8E6' }} />,
    1222: <AcUnitIcon sx={{ fontSize: 60, color: '#B0E0E6' }} />,
    1225: <AcUnitIcon sx={{ fontSize: 60, color: '#87CEFA' }} />,
    1087: <ThunderstormIcon sx={{ fontSize: 60, color: '#6A5ACD' }} />, // Thunder
    1279: <ThunderstormIcon sx={{ fontSize: 60, color: '#483D8B' }} />,
    1282: <ThunderstormIcon sx={{ fontSize: 60, color: '#191970' }} />,
    default: <WbSunnyIcon sx={{ fontSize: 60, color: '#FFD700' }} />,
  };
  return iconMap[conditionCode] || iconMap.default;
};

export const getWeatherAnimationStyles = (conditionCode, isDay) => {
  if (conditionCode === 1000) {
    return {
      animation: 'sunPulse 2s infinite alternate',
      '@keyframes sunPulse': {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(1.05)' },
      },
    };
  }
  if ([1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)) {
    return {
      animation: 'cloudDrift 8s ease-in-out infinite alternate',
      '@keyframes cloudDrift': {
        '0%': { transform: 'translateX(0px)' },
        '100%': { transform: 'translateX(10px)' },
      },
    };
  }
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(conditionCode)) {
    return {
      animation: 'rainBob 0.8s infinite alternate',
      '@keyframes rainBob': {
        '0%': { transform: 'translateY(0px)' },
        '100%': { transform: 'translateY(5px)' },
      },
    };
  }
  return {
    animation: 'subtlePulse 1.5s infinite alternate',
    '@keyframes subtlePulse': {
      '0%': { transform: 'scale(1)' },
      '100%': { transform: 'scale(1.02)' },
    },
  };
};

export const iconPulseAnimation = {
  animation: 'iconSubtlePulse 1.5s infinite alternate',
  '@keyframes iconSubtlePulse': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.03)' },
  },
}; 