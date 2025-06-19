import { render, screen } from '@testing-library/react';
import HourlyTemperatureChart from '../components/HourlyTemperatureChart';

describe('HourlyTemperatureChart', () => {
  it('renders chart title', () => {
    const hourlyData = [
      { time: '10:00', temp: 20 },
      { time: '11:00', temp: 22 },
    ];
    render(<HourlyTemperatureChart hourlyData={hourlyData} unit="celsius" />);
    expect(screen.getByText(/Hourly Temperature/i)).toBeInTheDocument();
  });

  it('renders nothing when hourlyData is empty', () => {
    const { container } = render(<HourlyTemperatureChart hourlyData={[]} unit="celsius" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders chart with Fahrenheit unit', () => {
    const hourlyData = [
      { time: '10:00', temp: 68 },
      { time: '11:00', temp: 70 },
    ];
    render(<HourlyTemperatureChart hourlyData={hourlyData} unit="fahrenheit" />);
    expect(screen.getByText(/Hourly Temperature/i)).toBeInTheDocument();
  });

  it('renders chart with multiple data points', () => {
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00`, temp: 15 + i }));
    render(<HourlyTemperatureChart hourlyData={hourlyData} unit="celsius" />);
    expect(screen.getByText(/Hourly Temperature/i)).toBeInTheDocument();
  });
}); 