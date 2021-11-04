import { render, getByTestId } from '@testing-library/react';
import SubNav from './sub-nav';

test('renders Sub Nav', () => {
  render(<SubNav />);
  expect(getByTestId(document.documentElement, 'hide-grid-dom')).toBeInTheDocument();
});
