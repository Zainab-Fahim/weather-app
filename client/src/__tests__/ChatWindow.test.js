import { render, screen } from '@testing-library/react';
import ChatWindow from '../components/ChatWindow';

describe('ChatWindow', () => {
  it('renders chat title and input when open', () => {
    render(<ChatWindow open={true} handleClose={() => {}} />);
    expect(screen.getByText(/Chat with Weather Bot/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
  });
}); 