import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading state', () => {
  render(<App />);
  const loadingElement = screen.getByText(/Gathering weather intelligence/i);
  expect(loadingElement).toBeInTheDocument();
}); 