import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  describe, expect, it, vi,
} from 'vitest';
import LandingPage from '@/(loginRoutes)/(landingPage)/page';

// mock useRouter
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

// make a mock function
const pushMock = vi.fn();

// return a value from useRouter mock
const useRouterMock = vi.spyOn(require('next/router'), 'useRouter');

useRouterMock.mockReturnValue({
  push: pushMock,
});

describe('LandingPage', () => {
  it('renders the logo image', () => {
    render(<LandingPage />);
    const logo = screen.getByAltText('Spot logo white');
    expect(logo).toBeInTheDocument();
  });

  it('renders the welcome text', () => {
    render(<LandingPage />);
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getByText('Spot')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<LandingPage />);
    expect(
      screen.getByText(
        'Find and rate the tastiest spots in town. Discover hidden gems, and share with your friends!',
      ),
    ).toBeInTheDocument();
  });

  it('renders the "Get Started" text', () => {
    render(<LandingPage />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders the "Log In" button', () => {
    render(<LandingPage />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('renders the "Register" button', () => {
    render(<LandingPage />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('has link to login page', () => {
    render(<LandingPage />);
    const loginLink = screen.getByRole('link', { name: 'Log In' });
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('has link to register page', () => {
    render(<LandingPage />);
    const registerLink = screen.getByRole('link', { name: 'Register' });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
