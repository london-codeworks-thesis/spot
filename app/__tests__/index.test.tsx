import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/)).toBeDefined();
  });
});
