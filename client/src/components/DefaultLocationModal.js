import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel as MuiFormControlLabel, Radio,
  Autocomplete, TextField, Box, Typography
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function DefaultLocationModal({
  openLocationModal, setOpenLocationModal,
  defaultLocationType, setDefaultLocationType,
  customDefaultLocation, setCustomDefaultLocation,
  suggestions, handleInputChange, theme,
  handleSaveDefaultLocation
}) {
  return (
    <Dialog open={openLocationModal} onClose={() => setOpenLocationModal(false)} maxWidth="xs" fullWidth>
      <DialogTitle>Set Default Location</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Choose Default Type</FormLabel>
          <RadioGroup
            row
            name="default-location-type"
            value={defaultLocationType}
            onChange={(e) => setDefaultLocationType(e.target.value)}
          >
            <MuiFormControlLabel value="current" control={<Radio />} label="Current Location" />
            <MuiFormControlLabel value="custom" control={<Radio />} label="Custom Location" />
          </RadioGroup>
        </FormControl>

        {defaultLocationType === 'custom' && (
          <Autocomplete
            freeSolo
            options={suggestions}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
            onInputChange={handleInputChange}
            onChange={(event, newValue) => {
              if (!newValue) {
                setCustomDefaultLocation('');
              } else {
                setCustomDefaultLocation(typeof newValue === 'string' ? newValue : newValue.name);
              }
            }}
            value={customDefaultLocation}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter Default City, Zip Code or IP"
                variant="outlined"
                fullWidth
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                {option.name}, {option.region && `${option.region}, `}{option.country}
              </Box>
            )}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenLocationModal(false)}>Cancel</Button>
        <Button onClick={handleSaveDefaultLocation} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DefaultLocationModal; 