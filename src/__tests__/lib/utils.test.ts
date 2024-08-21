import { describe, it, expect } from 'vitest'; // Assuming you are using Vitest for testing
import cn from '@/lib/utils';

describe('cn utility function', () => {
  it('should return an empty string when no arguments are provided', () => {
    expect(cn()).toBe('');
  });

  it('should return a single class name when one argument is provided', () => {
    expect(cn('class1')).toBe('class1');
  });

  it('should return a string of class names when multiple arguments are provided', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional class names', () => {
    expect(cn('class1', false && 'class2', true && 'class3')).toBe(
      'class1 class3',
    );
  });

  it('should merge Tailwind CSS classes correctly', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
