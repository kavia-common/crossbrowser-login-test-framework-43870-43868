import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard page title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders sidebar navigation', () => {
  render(<App />);
  const docLink = screen.getByText(/Documentation/i);
  expect(docLink).toBeInTheDocument();
});
