import React from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/material/styles';

function LocationSearchBar({
  searchInputValue, suggestions,
  handleInputChange, handleLocationSelect, handleSearchSubmit
}) {
  const theme = useTheme();

  return (
    <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: { xs: 2, md: 4 }, display: 'flex', width: '100%', maxWidth: 500 }}>
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
        onInputChange={handleInputChange}
        onChange={handleLocationSelect}
        value={searchInputValue}
        sx={{ flexGrow: 1, mr: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter City, Zip Code or IP"
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
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
}

export default LocationSearchBar; 