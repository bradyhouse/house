import { render, screen } from '@testing-library/react';
import TopNav from './top-nav.jsx';

test('renders Github Link', () => {
  render(<TopNav />);
  const linkElement = screen.getByText(/Github/i);
  expect(linkElement).toBeInTheDocument();
});
