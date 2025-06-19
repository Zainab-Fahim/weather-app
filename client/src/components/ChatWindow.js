import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, TextField, IconButton, Paper, Slide, CircularProgress, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import { sendChatMessage } from '../utils/chatApi';

function randomSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function ChatWindow({ open, handleClose }) {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Assistant', text: 'Hi! Ask me about the weather anywhere.', type: 'received' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionId = useRef(randomSessionId());
  const chatBottomRef = useRef(null);
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'User', text: input, type: 'sent' };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const res = await sendChatMessage(sessionId.current, input);
      setMessages((msgs) => [
        ...msgs,
        { id: Date.now() + 1, sender: 'Assistant', text: res.message, type: 'received' },
      ]);
    } catch (e) {
      setError('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (chatBottomRef.current) {
          chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: { xs: '90%', sm: 350 },
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 8,
        borderRadius: 2,
        zIndex: 1300,
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
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: isDark ? '#18191A' : theme.palette.background.default }}>
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
                  bgcolor: message.type === 'sent'
                    ? theme.palette.primary.main
                    : (isDark ? '#23272F' : theme.palette.grey[200]),
                  color: message.type === 'sent'
                    ? theme.palette.primary.contrastText
                    : (isDark ? '#F1F1F1' : theme.palette.text.primary),
                  borderRadius: 3,
                  p: 1.5,
                  maxWidth: '75%',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body2" fontWeight="bold">{message.sender}</Typography>
                <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>{message.text}</Typography>
              </Box>
            </Box>
          ))}
          <div ref={chatBottomRef} />
        </Box>
        {error && <Alert severity="error" sx={{ mx: 2, mb: 1 }}>{error}</Alert>}
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: isDark ? '#18191A' : theme.palette.background.paper, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={loading}
            sx={{
              mr: 1,
              input: {
                color: isDark ? '#F1F1F1' : theme.palette.text.primary,
                bgcolor: isDark ? '#23272F' : theme.palette.grey[100],
              },
            }}
          />
          <IconButton color="primary" aria-label="send" size="large" onClick={handleSend} disabled={loading || !input.trim()}>
            {loading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
    </Slide>
  );
}

export default ChatWindow; 