import { render, screen } from '@testing-library/react';
import RichGrid from './rich-grid';

test('renders RichGrid', () => {
  render(<RichGrid />);
  const richGrid = screen.getAllByTestId('richGrid');
  expect(richGrid).toBeInTheDocument();
});
