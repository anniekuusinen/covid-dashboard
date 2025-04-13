import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DarkModeToggle from './DarkModeToggle';

describe('DarkModeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('renders the toggle with Light Mode text by default', () => {
    render(<DarkModeToggle />);

    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles to dark mode when clicked', () => {
    render(<DarkModeToggle />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light mode when clicked again', () => {
    render(<DarkModeToggle />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists dark mode state in localStorage', () => {
    render(<DarkModeToggle />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('dark');
    render(<DarkModeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('persists light mode state in localStorage', () => {
    render(<DarkModeToggle />);

    expect(localStorage.getItem('theme')).toBe('light');
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
