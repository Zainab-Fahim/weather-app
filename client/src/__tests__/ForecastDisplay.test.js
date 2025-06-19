import { render, screen, fireEvent } from '@testing-library/react';
import ForecastDisplay from '../components/ForecastDisplay';

describe('ForecastDisplay', () => {
  it('renders forecast days when forecastData is provided', () => {
    const forecastData = {
      forecast: {
        forecastday: [
          {
            date: '2023-01-01',
            day: {
              condition: { code: 1000, text: 'Sunny', icon: '' },
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              daily_chance_of_rain: 10,
              avghumidity: 50,
              maxwind_kph: 15,
              maxwind_mph: 9,
              wind_dir: 'N',
            },
          },
        ],
      },
    };
    render(
      <ForecastDisplay
        forecastData={forecastData}
        unit="celsius"
        expandedDay={null}
        handleExpandClick={() => {}}
      />
    );
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
    expect(screen.getByText(/High:/i)).toBeInTheDocument();
    expect(screen.getByText(/Low:/i)).toBeInTheDocument();
  });

  it('renders multiple forecast days', () => {
    const forecastData = {
      forecast: {
        forecastday: [
          {
            date: '2023-01-01',
            day: {
              condition: { code: 1000, text: 'Sunny', icon: '' },
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              daily_chance_of_rain: 10,
              avghumidity: 50,
              maxwind_kph: 15,
              maxwind_mph: 9,
              wind_dir: 'N',
            },
          },
          {
            date: '2023-01-02',
            day: {
              condition: { code: 1003, text: 'Cloudy', icon: '' },
              maxtemp_c: 25,
              maxtemp_f: 77,
              mintemp_c: 15,
              mintemp_f: 59,
              daily_chance_of_rain: 20,
              avghumidity: 60,
              maxwind_kph: 10,
              maxwind_mph: 6,
              wind_dir: 'E',
            },
          },
        ],
      },
    };
    render(
      <ForecastDisplay
        forecastData={forecastData}
        unit="celsius"
        expandedDay={null}
        handleExpandClick={() => {}}
      />
    );
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudy/i)).toBeInTheDocument();
  });

  it('expands and collapses a day', () => {
    const forecastData = {
      forecast: {
        forecastday: [
          {
            date: '2023-01-01',
            day: {
              condition: { code: 1000, text: 'Sunny', icon: '' },
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              daily_chance_of_rain: 10,
              avghumidity: 50,
              maxwind_kph: 15,
              maxwind_mph: 9,
              wind_dir: 'N',
            },
          },
        ],
      },
    };
    let expandedDay = null;
    const handleExpandClick = jest.fn((date) => { expandedDay = date; });
    render(
      <ForecastDisplay
        forecastData={forecastData}
        unit="celsius"
        expandedDay={expandedDay}
        handleExpandClick={handleExpandClick}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleExpandClick).toHaveBeenCalledWith('2023-01-01');
  });

  it('renders nothing when forecastData is missing', () => {
    const { container } = render(<ForecastDisplay forecastData={null} unit="celsius" expandedDay={null} handleExpandClick={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders with and without condition icon', () => {
    const forecastData = {
      forecast: {
        forecastday: [
          {
            date: '2023-01-01',
            day: {
              condition: { code: 1000, text: 'Sunny', icon: '/icon.png' },
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              daily_chance_of_rain: 10,
              avghumidity: 50,
              maxwind_kph: 15,
              maxwind_mph: 9,
              wind_dir: 'N',
            },
          },
          {
            date: '2023-01-02',
            day: {
              condition: { code: 1003, text: 'Cloudy', icon: '' },
              maxtemp_c: 25,
              maxtemp_f: 77,
              mintemp_c: 15,
              mintemp_f: 59,
              daily_chance_of_rain: 20,
              avghumidity: 60,
              maxwind_kph: 10,
              maxwind_mph: 6,
              wind_dir: 'E',
            },
          },
        ],
      },
    };
    render(
      <ForecastDisplay
        forecastData={forecastData}
        unit="celsius"
        expandedDay={null}
        handleExpandClick={() => {}}
      />
    );
    expect(screen.getByAltText(/Sunny/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudy/i)).toBeInTheDocument();
  });
}); 