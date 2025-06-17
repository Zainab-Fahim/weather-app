import React from 'react';
import {
  Card, CardContent, Typography, Box, useTheme
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HourlyTemperatureChart({ hourlyData, unit }) {
  const theme = useTheme();

  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  return (
    <Card sx={{ width: '100%', maxWidth: 600, mb: { xs: 3, md: 4 }, p: { xs: 2, md: 3 }, boxShadow: 3, borderRadius: 2, bgcolor: theme.palette.background.paper }}>
      <CardContent>
        <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }} color="text.primary">Hourly Temperature (Next 24 Hours)</Typography>
        <Box sx={{ width: '100%', height: 300, mt: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData} margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis dataKey="time" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} label={{ value: `Temp (${unit === 'celsius' ? '°C' : '°F'})`, angle: -90, position: 'insideLeft', fill: theme.palette.text.secondary }} />
              <Tooltip
                contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}
                labelStyle={{ color: theme.palette.text.primary }}
                itemStyle={{ color: theme.palette.text.secondary }}
                formatter={(value) => [`${value}${unit === 'celsius' ? '°C' : '°F'}`, 'Temperature']}
              />
              <Line type="monotone" dataKey="temp" stroke={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default HourlyTemperatureChart; 