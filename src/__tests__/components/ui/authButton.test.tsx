import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import AuthButton from '@ui/authButton';
import googleIcon from '~/google.svg';
import facebookIcon from '~/facebook.svg';
import appleIcon from '~/apple.svg';

describe('AuthButton Component', () => {
  const handleClick = vi.fn();

  it('renders the google icon', () => {
    render(<AuthButton icon="google" onClick={handleClick} />);
    const googleImage = screen.getByAltText('google');
    expect(googleImage).toBeInTheDocument();
    expect(googleImage).toHaveAttribute('src', googleIcon.src);
  });

  it('renders the facebook icon', () => {
    render(<AuthButton icon="facebook" onClick={handleClick} />);
    const facebookImage = screen.getByAltText('facebook');
    expect(facebookImage).toBeInTheDocument();
    expect(facebookImage).toHaveAttribute('src', facebookIcon.src);
  });

  it('renders the apple icon', () => {
    render(<AuthButton icon="apple" onClick={handleClick} />);
    const appleImage = screen.getByAltText('apple');
    expect(appleImage).toBeInTheDocument();
    expect(appleImage).toHaveAttribute('src', appleIcon.src);
  });

  it('calls onClick handler when clicked', () => {
    render(<AuthButton icon="google" onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct button variant and class', () => {
    render(<AuthButton icon="google" onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex-1 py-6');
  });

  // it('has the priority attribute on the Image component', () => {
  //   render(<AuthButton icon="google" onClick={handleClick} />);
  //   const googleImage = screen.getByAltText('google');
  //   expect(googleImage).toHaveAttribute('priority');
  // });
});
