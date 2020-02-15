import React from 'react';
import { render } from '@testing-library/react';
import App from './../App';

test('renders Currency converter link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Currency converter/i);
  expect(linkElement).toBeInTheDocument();
});
