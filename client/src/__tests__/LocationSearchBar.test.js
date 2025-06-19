import { render, screen, fireEvent } from '@testing-library/react';
import LocationSearchBar from '../components/LocationSearchBar';

describe('LocationSearchBar', () => {
  it('renders input label and search button', () => {
    render(
      <LocationSearchBar
        searchInputValue=""
        suggestions={[]}
        handleInputChange={() => {}}
        handleLocationSelect={() => {}}
        handleSearchSubmit={e => e.preventDefault()}
      />
    );
    expect(screen.getByLabelText(/Enter City, Zip Code or IP/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls handleInputChange when typing', () => {
    const handleInputChange = jest.fn();
    render(
      <LocationSearchBar
        searchInputValue=""
        suggestions={[]}
        handleInputChange={handleInputChange}
        handleLocationSelect={() => {}}
        handleSearchSubmit={e => e.preventDefault()}
      />
    );
    fireEvent.change(screen.getByLabelText(/Enter City, Zip Code or IP/i), { target: { value: 'Lon' } });
    expect(handleInputChange).toHaveBeenCalled();
  });

  it('calls handleSearchSubmit when form is submitted', () => {
    const handleSearchSubmit = jest.fn(e => e.preventDefault());
    render(
      <LocationSearchBar
        searchInputValue="London"
        suggestions={[]}
        handleInputChange={() => {}}
        handleLocationSelect={() => {}}
        handleSearchSubmit={handleSearchSubmit}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSearchSubmit).toHaveBeenCalled();
  });
}); 