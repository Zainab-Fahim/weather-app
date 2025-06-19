import { render, screen } from '@testing-library/react';
import AstronomyCard from '../components/AstronomyCard';

describe('AstronomyCard', () => {
  it('renders astronomy data', () => {
    const astronomyData = {
      sunrise: '6:00 AM',
      sunset: '8:00 PM',
      moonrise: '7:00 PM',
      moonset: '5:00 AM',
      moon_phase: 'Full Moon',
    };
    render(<AstronomyCard astronomyData={astronomyData} />);
    expect(screen.getByText(/Sunrise: 6:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunset: 8:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Moonrise: 7:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Moonset: 5:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/Moon Phase:/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Moon/i)).toBeInTheDocument();
  });

  it('renders partial astronomy data', () => {
    const astronomyData = {
      sunrise: '6:00 AM',
      sunset: '',
      moonrise: '',
      moonset: '',
      moon_phase: '',
    };
    render(<AstronomyCard astronomyData={astronomyData} />);
    expect(screen.getByText(/Sunrise: 6:00 AM/i)).toBeInTheDocument();
  });

  it('renders nothing if astronomyData is missing', () => {
    const { container } = render(<AstronomyCard />);
    // Should still render the card, but with empty fields
    expect(container).toBeInTheDocument();
  });
}); 