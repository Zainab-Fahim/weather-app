import React from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

function LocationSearchBar({
  searchInputValue, suggestions,
  handleInputChange, handleLocationSelect, handleSearchSubmit
}) {
  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        mb: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        maxWidth: 600,
        gap: { xs: 2, sm: 1 },
      }}
    >
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
        onInputChange={handleInputChange}
        onChange={handleLocationSelect}
        value={searchInputValue}
        sx={{
          flex: 3,
          mb: { xs: 1, sm: 0 },
          mr: { xs: 0, sm: 1 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter city, zip code or IP"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <LocationOnIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
            {option.name}, {option.region && `${option.region}, `}{option.country}
          </Box>
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          flex: 1,                         // button is 1 share of the available space
          maxWidth: { xs: '100%', sm: 120 }, // full-width on mobile, 120px on desktop
          height: 56,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem',
        }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
  );
}

export default LocationSearchBar; 