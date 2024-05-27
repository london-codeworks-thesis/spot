import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LandingPage from '@/(loginRoutes)/(landingPage)/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<LandingPage />);
    expect(screen.getByText('Log In')).toBeDefined();
  });
});
