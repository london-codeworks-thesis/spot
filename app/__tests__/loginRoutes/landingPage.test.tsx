import { render, screen } from '@testing-library/react';
import React from 'react';
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

describe('Landing Page', () => {
  it('renders the logo', () => {
    render(<LandingPage />);
    const logo = screen.getByAltText('Spot logo white');
    expect(logo).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    render(<LandingPage />);
    const heading = screen.getByText('Welcome to');
    expect(heading).toBeInTheDocument();
  });

  it('renders the second part of main header with word Spot', () => {
    render(<LandingPage />);
    const secondHeading = screen.getByText('Spot');
    expect(secondHeading).toBeInTheDocument();
  });

  it('renders the description test', () => {
    render(<LandingPage />);
    const description = screen.getByText(
      'Find and rate the tastiest spots in town. Discover hidden gems, and share with your friends!',
    );
    expect(description).toBeInTheDocument();
  });

  it('renders the "Get Started" text', () => {
    render(<LandingPage />);
    const getStartedText = screen.getByText('Get Started');
    expect(getStartedText).toBeInTheDocument();
  });

  it('renders the Log In button', () => {
    render(<LandingPage />);
    const loginButton = screen.getByText('Log In');
    expect(loginButton).toBeInTheDocument();
  });

  it('renders the Register button', () => {
    render(<LandingPage />);
    const registerButton = screen.getByText('Register');
    expect(registerButton).toBeInTheDocument();
  });

  it('has link to login page', () => {
    render(<LandingPage />);
    const loginLink = screen.getByRole('link', { name: 'Log In' });
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('has link to register page', () => {
    render(<LandingPage />);
    const loginLink = screen.getByRole('link', { name: 'Register' });
    expect(loginLink).toHaveAttribute('href', '/register');
  });
});
