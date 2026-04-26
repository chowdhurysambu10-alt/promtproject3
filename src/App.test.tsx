import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />);
    const headingElements = screen.getAllByText(/Every Vote Shapes the/i);
    expect(headingElements.length).toBeGreaterThan(0);
  });
});
