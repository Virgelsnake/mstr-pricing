import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Time in Country/i);
  expect(headingElement).toBeInTheDocument();
});
