import React from 'react';
import { Box, Alert, Typography } from '@mui/material';

function AlertsDisplay({ alertsData }) {
  if (!alertsData || alertsData.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mb: { xs: 3, md: 4 } }}>
      {alertsData.map((alert, index) => (
        <Alert key={index} severity="warning" sx={{ mb: 1, boxShadow: 1, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">{alert.event}</Typography>
          <Typography variant="body2" color="text.primary">{alert.headline}</Typography>
          <Typography variant="caption" display="block" mt={0.5} color="text.primary">Expires: {new Date(alert.expires).toLocaleString()}</Typography>
        </Alert>
      ))}
    </Box>
  );
}

export default AlertsDisplay; 