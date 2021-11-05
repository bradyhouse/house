import { getByTestId, render } from '@testing-library/react';
import Content from './content';

test('renders Content', () => {
  render(<Content />);
  expect(getByTestId(document.documentElement, 'contentContainer')).toBeInTheDocument();
});
