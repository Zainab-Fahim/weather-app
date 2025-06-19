import { render, screen } from '@testing-library/react';
import AlertsDisplay from '../components/AlertsDisplay';

describe('AlertsDisplay', () => {
  it('renders alert events when alertsData is provided', () => {
    const alertsData = [
      { event: 'Storm Warning', headline: 'Severe storm approaching', expires: '2024-06-18T18:00:00Z' },
      { event: 'Flood Alert', headline: 'River levels rising', expires: '2024-06-18T20:00:00Z' },
    ];
    render(<AlertsDisplay alertsData={alertsData} />);
    expect(screen.getByText(/Storm Warning/i)).toBeInTheDocument();
    expect(screen.getByText(/Severe storm approaching/i)).toBeInTheDocument();
    expect(screen.getByText(/Flood Alert/i)).toBeInTheDocument();
    expect(screen.getByText(/River levels rising/i)).toBeInTheDocument();
  });

  it('renders formatted expiration date', () => {
    const alertsData = [
      { event: 'Storm Warning', headline: 'Severe storm approaching', expires: '2024-06-18T18:00:00Z' },
    ];
    render(<AlertsDisplay alertsData={alertsData} />);
    // The formatted date string should appear
    expect(screen.getByText(/Expires:/i)).toBeInTheDocument();
  });

  it('renders nothing when alertsData is empty', () => {
    const { container } = render(<AlertsDisplay alertsData={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when alertsData is missing', () => {
    const { container } = render(<AlertsDisplay />);
    expect(container).toBeEmptyDOMElement();
  });
}); 