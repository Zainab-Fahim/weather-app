import { render, screen, fireEvent } from '@testing-library/react';
import SettingsMenu from '../components/SettingsMenu';

describe('SettingsMenu', () => {
  it('renders Weather App title and settings icon', () => {
    render(
      <SettingsMenu
        themeMode="light"
        setThemeMode={() => {}}
        setOpenLocationModal={() => {}}
        unit="celsius"
        setUnit={() => {}}
        anchorEl={null}
        handleSettingsClick={() => {}}
        handleSettingsClose={() => {}}
      />
    );
    expect(screen.getByText(/Weather App/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/settings/i)).toBeInTheDocument();
  });

  it('calls handleSettingsClick when settings icon is clicked', () => {
    const handleSettingsClick = jest.fn();
    render(
      <SettingsMenu
        themeMode="light"
        setThemeMode={() => {}}
        setOpenLocationModal={() => {}}
        unit="celsius"
        setUnit={() => {}}
        anchorEl={null}
        handleSettingsClick={handleSettingsClick}
        handleSettingsClose={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText(/settings/i));
    expect(handleSettingsClick).toHaveBeenCalled();
  });

  it('calls setUnit when unit switch is toggled', () => {
    const setUnit = jest.fn();
    render(
      <SettingsMenu
        themeMode="light"
        setThemeMode={() => {}}
        setOpenLocationModal={() => {}}
        unit="fahrenheit"
        setUnit={setUnit}
        anchorEl={document.createElement('div')}
        handleSettingsClick={() => {}}
        handleSettingsClose={() => {}}
      />
    );
    // Open the menu
    fireEvent.click(screen.getByLabelText(/settings/i));
    // Find the unit switch and toggle it
    const unitSwitch = screen.getByLabelText(/°C \/ °F/i);
    fireEvent.click(unitSwitch);
    expect(setUnit).toHaveBeenCalled();
  });

  it('calls setThemeMode when theme switch is toggled', () => {
    const setThemeMode = jest.fn();
    render(
      <SettingsMenu
        themeMode="dark"
        setThemeMode={setThemeMode}
        setOpenLocationModal={() => {}}
        unit="celsius"
        setUnit={() => {}}
        anchorEl={document.createElement('div')}
        handleSettingsClick={() => {}}
        handleSettingsClose={() => {}}
      />
    );
    // Open the menu
    fireEvent.click(screen.getByLabelText(/settings/i));
    // Find the theme switch and toggle it
    const switches = screen.getAllByRole('checkbox');
    fireEvent.click(switches[1]); // The second switch is the theme switch
    expect(setThemeMode).toHaveBeenCalled();
  });

  it('calls setOpenLocationModal when Change Default Location is clicked', () => {
    const setOpenLocationModal = jest.fn();
    render(
      <SettingsMenu
        themeMode="light"
        setThemeMode={() => {}}
        setOpenLocationModal={setOpenLocationModal}
        unit="celsius"
        setUnit={() => {}}
        anchorEl={document.createElement('div')}
        handleSettingsClick={() => {}}
        handleSettingsClose={() => {}}
      />
    );
    // Open the menu
    fireEvent.click(screen.getByLabelText(/settings/i));
    // Find and click the menu item
    const changeLocation = screen.getByText(/Change Default Location/i);
    fireEvent.click(changeLocation);
    expect(setOpenLocationModal).toHaveBeenCalledWith(true);
  });
}); 