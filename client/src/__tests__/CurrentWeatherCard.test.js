import { render, screen } from '@testing-library/react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';

describe('CurrentWeatherCard', () => {
  it('renders location and temperature', () => {
    const current = {
      condition: { code: 1000, text: 'Sunny', icon: '', is_day: 1 },
      temp_c: 25,
      temp_f: 77,
      humidity: 50,
      wind_kph: 10,
      wind_mph: 6,
      uv: 5,
      feelslike_c: 27,
      feelslike_f: 80,
      air_quality: { 'us-epa-index': 2 },
      is_day: 1,
    };
    const geoLoc = { name: 'London', country: 'UK' };
    render(<CurrentWeatherCard current={current} geoLoc={geoLoc} unit="celsius" />);
    expect(screen.getByText(/Current Weather in London, UK/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
  });

  it('renders air quality index if present', () => {
    const current = {
      condition: { code: 1000, text: 'Sunny', icon: '', is_day: 1 },
      temp_c: 25,
      temp_f: 77,
      humidity: 50,
      wind_kph: 10,
      wind_mph: 6,
      uv: 5,
      feelslike_c: 27,
      feelslike_f: 80,
      air_quality: { 'us-epa-index': 3 },
      is_day: 1,
    };
    const geoLoc = { name: 'Paris', country: 'France' };
    render(<CurrentWeatherCard current={current} geoLoc={geoLoc} unit="celsius" />);
    expect(screen.getByText(/Air Quality Index/i)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('does not render air quality index if missing', () => {
    const current = {
      condition: { code: 1000, text: 'Sunny', icon: '', is_day: 1 },
      temp_c: 25,
      temp_f: 77,
      humidity: 50,
      wind_kph: 10,
      wind_mph: 6,
      uv: 5,
      feelslike_c: 27,
      feelslike_f: 80,
      is_day: 1,
    };
    const geoLoc = { name: 'Berlin', country: 'Germany' };
    render(<CurrentWeatherCard current={current} geoLoc={geoLoc} unit="celsius" />);
    expect(screen.queryByText(/Air Quality Index/i)).not.toBeInTheDocument();
  });

  it('renders temperature in Fahrenheit', () => {
    const current = {
      condition: { code: 1000, text: 'Sunny', icon: '', is_day: 1 },
      temp_c: 25,
      temp_f: 77,
      humidity: 50,
      wind_kph: 10,
      wind_mph: 6,
      uv: 5,
      feelslike_c: 27,
      feelslike_f: 80,
      air_quality: { 'us-epa-index': 2 },
      is_day: 1,
    };
    const geoLoc = { name: 'New York', country: 'USA' };
    render(<CurrentWeatherCard current={current} geoLoc={geoLoc} unit="fahrenheit" />);
    expect(screen.getByText(/77°F/i)).toBeInTheDocument();
  });

  it('renders nothing if geoLoc is missing', () => {
    const current = {
      condition: { code: 1000, text: 'Sunny', icon: '', is_day: 1 },
      temp_c: 25,
      temp_f: 77,
      humidity: 50,
      wind_kph: 10,
      wind_mph: 6,
      uv: 5,
      feelslike_c: 27,
      feelslike_f: 80,
      air_quality: { 'us-epa-index': 2 },
      is_day: 1,
    };
    render(<CurrentWeatherCard current={current} unit="celsius" />);
    // Should not throw, but may render incomplete info
    expect(screen.queryByText(/Current Weather in/i)).not.toBeInTheDocument();
  });
}); 