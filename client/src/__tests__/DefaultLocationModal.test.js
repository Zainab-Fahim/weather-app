import { render, screen, fireEvent } from '@testing-library/react';
import DefaultLocationModal from '../components/DefaultLocationModal';

describe('DefaultLocationModal', () => {
  it('renders dialog title and radio buttons', () => {
    render(
      <DefaultLocationModal
        openLocationModal={true}
        setOpenLocationModal={() => {}}
        defaultLocationType="current"
        setDefaultLocationType={() => {}}
        customDefaultLocation=""
        setCustomDefaultLocation={() => {}}
        suggestions={[]}
        handleInputChange={() => {}}
        theme={{ palette: { text: { secondary: '#000' } } }}
        handleSaveDefaultLocation={() => {}}
      />
    );
    expect(screen.getByText(/Set Default Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom Location/i)).toBeInTheDocument();
  });

  it('switches to custom location and allows input', () => {
    const setDefaultLocationType = jest.fn();
    const setCustomDefaultLocation = jest.fn();
    render(
      <DefaultLocationModal
        openLocationModal={true}
        setOpenLocationModal={() => {}}
        defaultLocationType="custom"
        setDefaultLocationType={setDefaultLocationType}
        customDefaultLocation=""
        setCustomDefaultLocation={setCustomDefaultLocation}
        suggestions={[{ name: 'London', region: 'England', country: 'UK' }]}
        handleInputChange={() => {}}
        theme={{ palette: { text: { secondary: '#000' } } }}
        handleSaveDefaultLocation={() => {}}
      />
    );
    expect(screen.getByLabelText(/Enter Default City, Zip Code or IP/i)).toBeInTheDocument();
  });

  it('calls handleSaveDefaultLocation when Save is clicked', () => {
    const handleSaveDefaultLocation = jest.fn();
    render(
      <DefaultLocationModal
        openLocationModal={true}
        setOpenLocationModal={() => {}}
        defaultLocationType="current"
        setDefaultLocationType={() => {}}
        customDefaultLocation=""
        setCustomDefaultLocation={() => {}}
        suggestions={[]}
        handleInputChange={() => {}}
        theme={{ palette: { text: { secondary: '#000' } } }}
        handleSaveDefaultLocation={handleSaveDefaultLocation}
      />
    );
    fireEvent.click(screen.getByText(/Save/i));
    expect(handleSaveDefaultLocation).toHaveBeenCalled();
  });
}); 