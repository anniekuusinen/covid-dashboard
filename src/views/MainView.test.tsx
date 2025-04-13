import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MainView from './MainView';
import { CountryContext } from '../context/CountryContext';

// Mock child components
vi.mock('./StatisticsDisplay', () => ({
  default: () => <div data-testid="statistics-display">Statistics Display</div>,
}));

vi.mock('./CountryDisplay', () => ({
  default: () => <div data-testid="country-display">Country Display</div>,
}));

vi.mock('../components/DarkModeToggle', () => ({
  default: () => <div data-testid="dark-mode-toggle">Dark Mode Toggle</div>,
}));

vi.mock('../components/ErrorMessage', () => ({
  default: ({ error }: { error: string }) => (
    <div data-testid="error-view">{error}</div>
  ),
}));

describe('MainView', () => {
  const defaultMockContext = {
    countries: [],
    selectedCountry: null,
    setSelectedCountry: vi.fn(),
    countryData: null,
    loading: false,
    initialLoading: false,
    fatalError: null,
    countryDataError: null,
  };

  it('renders loading state when initialLoading is true', () => {
    const mockContext = {
      ...defaultMockContext,
      initialLoading: true,
    };

    render(
      <CountryContext.Provider value={mockContext}>
        <MainView />
      </CountryContext.Provider>
    );

    expect(screen.getByText('Loading Covid Dashboard...')).toBeInTheDocument();
  });

  it('renders ErrorView when fatalError exists', () => {
    const mockContext = {
      ...defaultMockContext,
      initialLoading: false,
      fatalError: 'Failed to fetch countries',
    };

    render(
      <CountryContext.Provider value={mockContext}>
        <MainView />
      </CountryContext.Provider>
    );

    expect(screen.getByTestId('error-view')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch countries')).toBeInTheDocument();
  });

  it('renders ErrorView when countryDataError exists', () => {
    const mockContext = {
      ...defaultMockContext,
      initialLoading: false,
      fatalError: null,
      countryDataError: 'Failed to fetch country data',
    };

    render(
      <CountryContext.Provider value={mockContext}>
        <MainView />
      </CountryContext.Provider>
    );

    expect(screen.getByTestId('error-view')).toBeInTheDocument();
    expect(
      screen.getByText('Failed to fetch country data')
    ).toBeInTheDocument();
  });

  it('renders all child components when there are no errors', () => {
    const mockContext = {
      ...defaultMockContext,
      initialLoading: false,
      fatalError: null,
      countryDataError: null,
    };

    render(
      <CountryContext.Provider value={mockContext}>
        <MainView />
      </CountryContext.Provider>
    );

    expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('country-display')).toBeInTheDocument();
    expect(screen.getByTestId('statistics-display')).toBeInTheDocument();
  });
});
