import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, CircularProgress, Typography, Alert, Button, Container,
  useTheme,
} from '@mui/material';
import { debounce } from 'lodash';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Cookies from 'js-cookie';
import SettingsMenu from './components/SettingsMenu';
import DefaultLocationModal from './components/DefaultLocationModal';
import LocationSearchBar from './components/LocationSearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import AstronomyCard from './components/AstronomyCard';
import AlertsDisplay from './components/AlertsDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import HourlyTemperatureChart from './components/HourlyTemperatureChart';
import ChatWindow from './components/ChatWindow';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';

function WeatherDisplay({ setThemeMode, themeMode }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [astronomyData, setAstronomyData] = useState(null);
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Colombo,Sri Lanka');
  const [suggestions, setSuggestions] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('Colombo,Sri Lanka');
  const [unit, setUnit] = useState('celsius'); // 'celsius' or 'fahrenheit'
  const [anchorEl, setAnchorEl] = useState(null); // For settings menu
  const [expandedDay, setExpandedDay] = useState(null); // State to track expanded forecast day
  const [openLocationModal, setOpenLocationModal] = useState(false); // State for default location modal
  const [defaultLocationType, setDefaultLocationType] = useState('custom'); // 'current' or 'custom'
  const [customDefaultLocation, setCustomDefaultLocation] = useState('Colombo,Sri Lanka');
  const [openChat, setOpenChat] = useState(false); // State for chat window modal

  const theme = useTheme();

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchSuggestions = useCallback(
    debounce(async (searchValue) => {
      if (searchValue.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchValue}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSuggestions(data.map(item => ({ name: item.name, region: item.region, country: item.country })));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }, 300),
    [apiKey]
  );

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      let initialLocation = location;
      const savedDefaultLocation = Cookies.get('defaultLocation');

      if (savedDefaultLocation) {
        if (savedDefaultLocation === 'current_location') {
          setDefaultLocationType('current');
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              initialLocation = `${latitude},${longitude}`;
              setLocation(initialLocation);
            }, (geoError) => {
              console.error("Error getting current location:", geoError);
              setError(new Error("Unable to retrieve current location. Defaulting to Colombo."));
              initialLocation = 'Colombo,Sri Lanka';
              setLocation(initialLocation);
            });
          } else {
            setError(new Error("Geolocation not supported. Defaulting to Colombo."));
            initialLocation = 'Colombo,Sri Lanka';
            setLocation(initialLocation);
          }
        } else {
          setDefaultLocationType('custom');
          setCustomDefaultLocation(savedDefaultLocation);
          initialLocation = savedDefaultLocation;
          setLocation(initialLocation);
        }
      }

      if (!initialLocation) return; // Should not happen if a default is always set or tried

      setLoading(true);
      setError(null);

      try {
        const currentWeatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${initialLocation}&aqi=yes`);
        if (!currentWeatherResponse.ok) {
          throw new Error(`HTTP error! status: ${currentWeatherResponse.status} for current weather`);
        }
        const currentData = await currentWeatherResponse.json();
        setWeatherData(currentData);

        const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${initialLocation}&days=3&alerts=yes&aqi=yes`);
        if (!forecastResponse.ok) {
          throw new Error(`HTTP error! status: ${forecastResponse.status} for forecast`);
        }
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
        setAlertsData(forecastData.alerts?.alert || []);

        const today = new Date().toISOString().slice(0, 10);
        const astronomyResponse = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${initialLocation}&dt=${today}`);
        if (!astronomyResponse.ok) {
          throw new Error(`HTTP error! status: ${astronomyResponse.status} for astronomy`);
        }
        const astronomyData = await astronomyResponse.json();
        setAstronomyData(astronomyData.astronomy.astro);

      } catch (error) {
        setError(error);
        console.error("Error fetching all weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeatherData();
  }, [location, apiKey]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLocation(searchInputValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setSearchInputValue(newInputValue);
    fetchSuggestions(newInputValue);
  };

  const handleLocationSelect = (event, newValue) => {
    if (newValue) {
      setSearchInputValue(typeof newValue === 'string' ? newValue : newValue.name);
      setLocation(typeof newValue === 'string' ? newValue : newValue.name);
    }
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (event) => {
    setThemeMode(event.target.checked ? 'dark' : 'light');
  };

  const handleExpandClick = (date) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  const handleSaveDefaultLocation = () => {
    if (defaultLocationType === 'current') {
      Cookies.set('defaultLocation', 'current_location', { expires: 365 });
    } else {
      Cookies.set('defaultLocation', customDefaultLocation, { expires: 365 });
    }
    setOpenLocationModal(false);
    // Reload weather data based on new default
    // This will trigger the useEffect, which will read the cookie again
    setLocation(defaultLocationType === 'current' ? 'current_location' : customDefaultLocation);
  };

  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={theme.palette.background.default}
        sx={{
          transition: 'background-color 0.5s ease-in-out',
        }}
      >
        <Box
          sx={{
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(0.8)' },
              '70%': { transform: 'scale(1)' },
              '100%': { transform: 'scale(0.8)' },
            },
            color: theme.palette.primary.main, // Use theme primary color for icon
          }}
        >
          <WbSunnyIcon sx={{ fontSize: 100 }} /> { /* Or CloudIcon, or a combination */}
        </Box>
        <Typography variant="h5" sx={{ mt: 3, color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Gathering weather intelligence...
        </Typography>
        <CircularProgress size={40} thickness={4} sx={{ mt: 3, color: theme.palette.primary.main }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default} p={3}>
        <Alert severity="error" sx={{ mb: 2, width: '100%', maxWidth: 500 }}>
          <Typography variant="h6">Error fetching weather data</Typography>
          <Typography>{error.message}</Typography>
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!weatherData) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default} p={3}>
        <Typography variant="h6" color={theme.palette.text.secondary} sx={{ mb: 3 }}>No weather data available. Please try searching for a city.</Typography>
        <LocationSearchBar
          searchInputValue={searchInputValue}
          suggestions={suggestions}
          handleInputChange={handleInputChange}
          handleLocationSelect={handleLocationSelect}
          handleSearchSubmit={handleSearchSubmit}
        />
      </Box>
    );
  }

  const { current, location: geoLoc } = weatherData;

  // Prepare data for the hourly temperature chart
  const hourlyData = forecastData?.forecast?.forecastday[0]?.hour.map(hour => ({
    time: new Date(hour.time).getHours() + ':00',
    temp: unit === 'celsius' ? hour.temp_c : hour.temp_f,
  })) || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <SettingsMenu
        themeMode={themeMode}
        setThemeMode={handleThemeChange}
        setOpenLocationModal={setOpenLocationModal}
        unit={unit}
        setUnit={setUnit}
        anchorEl={anchorEl}
        handleSettingsClick={handleSettingsClick}
        handleSettingsClose={handleSettingsClose}
      />

      <DefaultLocationModal
        openLocationModal={openLocationModal}
        setOpenLocationModal={setOpenLocationModal}
        defaultLocationType={defaultLocationType}
        setDefaultLocationType={setDefaultLocationType}
        customDefaultLocation={customDefaultLocation}
        setCustomDefaultLocation={setCustomDefaultLocation}
        suggestions={suggestions}
        handleInputChange={handleInputChange}
        theme={theme}
        handleSaveDefaultLocation={handleSaveDefaultLocation}
      />

      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <LocationSearchBar
          searchInputValue={searchInputValue}
          suggestions={suggestions}
          handleInputChange={handleInputChange}
          handleLocationSelect={handleLocationSelect}
          handleSearchSubmit={handleSearchSubmit}
        />

        <AlertsDisplay alertsData={alertsData} />

        <CurrentWeatherCard current={current} geoLoc={geoLoc} unit={unit} />

        {astronomyData && (
          <AstronomyCard astronomyData={astronomyData} />
        )}

        <ForecastDisplay
          forecastData={forecastData}
          unit={unit}
          expandedDay={expandedDay}
          handleExpandClick={handleExpandClick}
        />

        <HourlyTemperatureChart hourlyData={hourlyData} unit={unit} />

      </Container>

      <ChatWindow open={openChat} handleClose={handleCloseChat} />

      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpenChat}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
}

export default WeatherDisplay;