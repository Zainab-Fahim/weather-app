import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem,
  FormControlLabel, Switch, useTheme
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function SettingsMenu({ themeMode, setThemeMode, setOpenLocationModal, unit, setUnit, anchorEl, handleSettingsClick, handleSettingsClose }) {
  const theme = useTheme();
  const openSettings = Boolean(anchorEl);

  return (
    <AppBar position="static" sx={{ mb: { xs: 2, md: 4 }, bgcolor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Weather App
        </Typography>
        <IconButton
          aria-label="settings"
          onClick={handleSettingsClick}
          sx={{ color: theme.palette.primary.contrastText }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openSettings}
          onClose={handleSettingsClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <FormControlLabel
              control={<Switch checked={unit === 'fahrenheit'} onChange={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')} />}
              label="°C / °F"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  checked={themeMode === 'dark'}
                  onChange={setThemeMode}
                />
              }
              label={themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />} 
            />
          </MenuItem>
          <MenuItem onClick={() => { handleSettingsClose(); setOpenLocationModal(true); }}>
            Change Default Location
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default SettingsMenu; 