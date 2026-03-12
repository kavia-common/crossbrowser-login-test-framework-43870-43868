import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard page title', () => {
  render(<App />);
  // Use getByRole('heading') to uniquely target the <h2> page title,
  // avoiding ambiguity with the sidebar nav link that also contains "Dashboard".
  const titleElement = screen.getByRole('heading', { name: /dashboard/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders sidebar navigation', () => {
  render(<App />);
  // Use getByRole('link') to uniquely target the sidebar <NavLink>,
  // avoiding ambiguity with the quick-link button that also contains "Documentation".
  const docLink = screen.getByRole('link', { name: /documentation/i });
  expect(docLink).toBeInTheDocument();
});
