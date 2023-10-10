import { React } from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nasa Land Rover Application text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Nasa Land Rover Application/i);
  expect(linkElement).toBeInTheDocument();
});
