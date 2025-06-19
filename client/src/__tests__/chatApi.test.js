describe('chatApi', () => {
  const OLD_ENV = process.env;
  let chatApi;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.REACT_APP_WEATHER_CHAT_TOKEN_URL = 'https://token.url';
    process.env.REACT_APP_WEATHER_CHAT_CLIENT_KEY = 'key';
    process.env.REACT_APP_WEATHER_CHAT_CLIENT_SECRET = 'secret';
    process.env.REACT_APP_WEATHER_CHAT_API_URL = 'https://chat.url';
    global.fetch = jest.fn();
    chatApi = require('../utils/chatApi');
  });
  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('fetchAccessToken caches token and uses expiry', async () => {
    // Token fetch
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: 'abc123', expires_in: 3600 }) });
    // Chat fetch
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'hello' }) });
    await chatApi.sendChatMessage('session', 'hi');
    // Second call: should not call token fetch again, only chat
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'hello2' }) });
    await chatApi.sendChatMessage('session', 'hi');
    expect(fetch).toHaveBeenCalledTimes(3); // 1 token, 2 chat
  });

  it('throws error if token fetch fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(chatApi.sendChatMessage('session', 'hi')).rejects.toThrow('Failed to fetch access token');
  });

  it('throws error if chat message fails', async () => {
    // Token fetch
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: 'abc', expires_in: 3600 }) });
    // Chat fetch fails
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(chatApi.sendChatMessage('session', 'hi')).rejects.toThrow('Failed to send chat message');
  });

  it('returns chat message data on success', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: 'abc', expires_in: 3600 }) });
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'hello' }) });
    const data = await chatApi.sendChatMessage('session', 'hi');
    expect(data).toEqual({ message: 'hello' });
  });
}); 