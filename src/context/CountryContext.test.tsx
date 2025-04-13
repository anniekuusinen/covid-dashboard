import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CountryProvider, useCountryContext } from './CountryContext';
import { getCountries, getTotalReports } from '../services/Countries';
import { Country } from '../types/Country';
import { CountryData } from '../types/CountryData';

vi.mock('../services/Countries', () => ({
  getCountries: vi.fn(),
  getTotalReports: vi.fn(),
}));

const mockGetCountries = getCountries as unknown as jest.Mock;
const mockGetTotalReports = getTotalReports as jest.Mock;

const MockComponent = () => {
  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    countryData,
    loading,
    initialLoading,
    fatalError,
    countryDataError,
  } = useCountryContext();

  return (
    <div>
      {initialLoading && <p>Loading countries...</p>}
      {fatalError && <p>Error: {fatalError}</p>}
      <ul>
        {countries.map((country) => (
          <li key={country.iso}>{country.name}</li>
        ))}
      </ul>
      {selectedCountry && <p>Selected Country: {selectedCountry.name}</p>}
      {loading && <p>Loading country data...</p>}
      {countryDataError && <p>Error: {countryDataError}</p>}
      {countryData && (
        <p>
          Country Data: Confirmed - {countryData.confirmed}, Deaths -{' '}
          {countryData.deaths}
        </p>
      )}
      <button onClick={() => setSelectedCountry(countries[0])}>
        Select First Country
      </button>
    </div>
  );
};

describe('CountryContext', () => {
  const mockCountries: Country[] = [
    { name: 'United States', iso: 'US' },
    { name: 'Canada', iso: 'CA' },
  ];

  const mockCountryData: CountryData = {
    confirmed: 1000,
    deaths: 50,
    recovered: 900,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays countries', async () => {
    mockGetCountries.mockResolvedValue(mockCountries);

    render(
      <CountryProvider>
        <MockComponent />
      </CountryProvider>
    );

    expect(screen.getByText('Loading countries...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  it('handles error when fetching countries fails', async () => {
    mockGetCountries.mockRejectedValue(new Error('Failed to fetch countries'));

    render(
      <CountryProvider>
        <MockComponent />
      </CountryProvider>
    );

    expect(screen.getByText('Loading countries...')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to fetch countries')
      ).toBeInTheDocument();
    });
  });

  it('fetches and displays country data when a country is selected', async () => {
    mockGetCountries.mockResolvedValue(mockCountries);
    mockGetTotalReports.mockResolvedValue(mockCountryData);

    render(
      <CountryProvider>
        <MockComponent />
      </CountryProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    screen.getByText('Select First Country').click();

    await waitFor(() => {
      expect(
        screen.getByText('Country Data: Confirmed - 1000, Deaths - 50')
      ).toBeInTheDocument();
    });
  });

  it('handles error when fetching country data fails', async () => {
    mockGetCountries.mockResolvedValue(mockCountries);
    mockGetTotalReports.mockRejectedValue(
      new Error('Failed to fetch country data')
    );

    render(
      <CountryProvider>
        <MockComponent />
      </CountryProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    screen.getByText('Select First Country').click();

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch data for United States/)
      ).toBeInTheDocument();
    });
  });
});
