import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherDisplay from '../WeatherDisplay';
import React from 'react';
// Place all mocks after imports
jest.mock('../components/SettingsMenu', () => () => <div data-testid="SettingsMenu" />);
jest.mock('../components/DefaultLocationModal', () => () => <div data-testid="DefaultLocationModal" />);
jest.mock('../components/LocationSearchBar', () => (props) => (
  <form data-testid="LocationSearchBar" onSubmit={props.handleSearchSubmit}>
    <input
      aria-label="location-input"
      value={props.searchInputValue}
      onChange={e => props.handleInputChange(e, e.target.value)}
    />
    <button type="submit">Search</button>
  </form>
));
jest.mock('../components/AlertsDisplay', () => () => <div data-testid="AlertsDisplay" />);
jest.mock('../components/CurrentWeatherCard', () => () => <div data-testid="CurrentWeatherCard" />);
jest.mock('../components/AstronomyCard', () => () => <div data-testid="AstronomyCard" />);
jest.mock('../components/ForecastDisplay', () => () => <div data-testid="ForecastDisplay" />);
jest.mock('../components/HourlyTemperatureChart', () => () => <div data-testid="HourlyTemperatureChart" />);
jest.mock('../components/ChatWindow', () => (props) => props.open ? <div data-testid="ChatWindow" /> : null);

// Mock useTheme
jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  useTheme: () => ({ palette: { background: { default: '#fff' }, primary: { main: '#000' }, text: { primary: '#000', secondary: '#888' } } }),
}));

let originalUseState, originalUseEffect;
beforeAll(() => {
  originalUseState = React.useState;
  originalUseEffect = React.useEffect;
});
beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementation(f => f());
});
afterEach(() => {
  React.useState = originalUseState;
  React.useEffect = originalUseEffect;
  jest.restoreAllMocks();
});

describe('WeatherDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    // Force loading state by mocking useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [null, jest.fn()]) // weatherData
      .mockImplementationOnce(() => [null, jest.fn()]) // forecastData
      .mockImplementationOnce(() => [null, jest.fn()]) // astronomyData
      .mockImplementationOnce(() => [[], jest.fn()]) // alertsData
      .mockImplementationOnce(() => [true, jest.fn()]); // loading
    render(<WeatherDisplay setThemeMode={() => {}} themeMode="light" />);
    expect(screen.getByText(/Gathering weather intelligence/i)).toBeInTheDocument();
  });
  it('does not render AstronomyCard if astronomyData is missing', () => {
    const fakeWeatherData = { current: {}, location: {} };
    const fakeForecastData = { forecast: { forecastday: [{ hour: [{ time: '2024-06-18T10:00:00', temp_c: 20, temp_f: 68 }] }] } };
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [fakeWeatherData, jest.fn()]) // weatherData
      .mockImplementationOnce(() => [fakeForecastData, jest.fn()]) // forecastData
      .mockImplementationOnce(() => [null, jest.fn()]) // astronomyData
      .mockImplementationOnce(() => [[], jest.fn()]) // alertsData
      .mockImplementationOnce(() => [false, jest.fn()]) // loading
      .mockImplementationOnce(() => [null, jest.fn()]) // error
      .mockImplementationOnce(() => ['Colombo', jest.fn()]) // location
      .mockImplementationOnce(() => [[], jest.fn()]) // suggestions
      .mockImplementationOnce(() => ['Colombo', jest.fn()]) // searchInputValue
      .mockImplementationOnce(() => ['celsius', jest.fn()]) // unit
      .mockImplementationOnce(() => [null, jest.fn()]) // anchorEl
      .mockImplementationOnce(() => [null, jest.fn()]) // expandedDay
      .mockImplementationOnce(() => [false, jest.fn()]) // openLocationModal
      .mockImplementationOnce(() => ['custom', jest.fn()]) // defaultLocationType
      .mockImplementationOnce(() => ['Colombo', jest.fn()]) // customDefaultLocation
      .mockImplementationOnce(() => [false, jest.fn()]); // openChat
    render(<WeatherDisplay setThemeMode={() => {}} themeMode="light" />);
    expect(screen.queryByTestId('AstronomyCard')).not.toBeInTheDocument();
  });

}); 