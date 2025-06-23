# Weather App

This project is a full-stack weather application with a React frontend and an Express backend. The backend proxies requests to external weather and chat APIs and CORS issues.

## Features

- 🌗 **Theme Switching:** Toggle between light and dark mode from the settings menu.
- 🌡️ **Temperature Units:** Instantly switch between Celsius and Fahrenheit.
- 📍 **Default Location:** Set your default location to your current geolocation or a custom city/zip/IP. Preferences are saved in cookies.
- ⚙️ **Settings Menu:** Centralized menu for theme, units, and default location.
- 💬 **Chat Window:** Ask weather-related questions via an integrated chat (floating button at bottom right).
- 📱 **Responsive Design:** Optimized for both desktop and mobile devices.

## Folder Structure

- `client/` — React frontend
- `server/` — Express backend

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd weather-app
```

### 2. Server Setup (`server/`)

```bash
cd server
npm install
```

#### Create a `.env` file in `client/` (see below for variables)

#### Start the server (default port: 5050)
```bash
node src/index.js
```

### 3. Client Setup (`client/`)

```bash
cd ../client
npm install
```

#### Start the React app (default port: 3000)
```bash
npm start
```

---

## Environment Variables

Create a `.env` file in the `client/` directory with the following variables:

```
REACT_APP_WEATHER_CHAT_TOKEN_URL=http://localhost:5050/api/token
REACT_APP_WEATHER_CHAT_API_URL=http://localhost:5050/api/chat
REACT_APP_WEATHER_CHAT_CLIENT_KEY=your_client_key_here
REACT_APP_WEATHER_CHAT_CLIENT_SECRET=your_client_secret_here
```

- Replace `your_client_key_here` and `your_client_secret_here` with your actual credentials.

---

## Usage

- The React app will be available at [http://localhost:3000](http://localhost:3000)
- The Express server will run at [http://localhost:5050](http://localhost:5050)
- Use the **settings icon** (top right) to:
  - Switch between light/dark mode
  - Change temperature units (°C/°F)
  - Set your default location (current or custom)
- Click the **chat button** (bottom right) to open the weather chat assistant.
- Preferences for theme, units, and default location are saved (using cookies/localStorage) and persist across sessions.
- The backend proxies token and chat requests to the external API, so your frontend never deals with CORS issues or secrets directly.

---

## Customization

- **Theme:** Your selected theme (light/dark) is saved in localStorage.
- **Units:** Temperature unit preference is saved in cookies.
- **Default Location:** Set to your current geolocation or a custom value; saved in cookies for persistence.

---

## Testing

- Run frontend tests from the `client/` directory:
  ```bash
  npm test
  ```
- Run backend tests from the `server/` directory:
  ```bash
  npm test
  ```

---

## Troubleshooting

- If you see CORS or network errors, ensure both the server and client are running and the ports match your `.env` settings.
- If port 5050 is in use, change the `PORT` in `server/src/index.js` and update your `.env` accordingly.
