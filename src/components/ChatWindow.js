import React from 'react';
import {
  Box, Typography, TextField, IconButton, Paper, Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

function ChatWindow({ open, handleClose }) {
  const theme = useTheme();

  // Sample messages for UI demonstration
  const messages = [
    { id: 1, sender: 'User', text: 'Hi there! How\'s the weather looking?', type: 'sent' },
    { id: 2, sender: 'Assistant', text: 'Hello! I can provide you with the latest weather information. What city are you interested in?', type: 'received' },
    { id: 3, sender: 'User', text: 'I\'m curious about London, UK.', type: 'sent' },
    { id: 4, sender: 'Assistant', text: 'Fetching weather data for London... Please wait a moment.', type: 'received' },
  ];

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: { xs: '90%', sm: 350 }, // Responsive width
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 8,
        borderRadius: 2,
        zIndex: 1300, // Ensure it's above other content
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, p: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Chat with Weather Bot</Typography>
          <IconButton
            aria-label="close chat"
            onClick={handleClose}
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: theme.palette.background.default }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: message.type === 'sent' ? theme.palette.primary.light : theme.palette.grey[300],
                  color: message.type === 'sent' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                  borderRadius: 3,
                  p: 1.5,
                  maxWidth: '75%',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body2" fontWeight="bold">{message.sender}</Typography>
                <Typography variant="body1">{message.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            sx={{ mr: 1 }}
          />
          <IconButton color="primary" aria-label="send" size="large">
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Slide>
  );
}

export default ChatWindow; 