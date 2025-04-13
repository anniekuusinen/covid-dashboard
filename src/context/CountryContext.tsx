import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import { Country } from '../types/Country';
import { CountryData } from '../types/CountryData';
import { getCountries, getTotalReports } from '../services/Countries';

interface CountryContextType {
  countries: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
  countryData: CountryData | null;
  loading: boolean;
  initialLoading: boolean;
  fatalError: string | null;
  countryDataError: string | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [countryDataLoading, setCountryDataLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [countryDataError, setCountryDataError] = useState<string | null>(null);
  const countryDataCache = useRef<Map<string, CountryData>>(new Map());

  useEffect(() => {
    const fetchCountries = async () => {
      setInitialLoading(true);
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        if (error instanceof Error) {
          setFatalError(error.message);
        } else {
          setFatalError('Error fetching countries');
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch data for the selected country whenever it changes
  useEffect(() => {
    const fetchCountryData = async () => {
      if (selectedCountry) {
        // Reset country data error state
        setCountryDataError(null);

        // Use cached data if available
        const cachedData = countryDataCache.current.get(selectedCountry.iso);

        if (cachedData) {
          setCountryData(cachedData);
          setCountryDataError(null);
          return;
        }

        setCountryDataLoading(true);
        try {
          const data = await getTotalReports(selectedCountry.iso);
          setCountryData(data);

          // Cache the fetched data
          countryDataCache.current.set(selectedCountry.iso, data);
        } catch (error) {
          console.error(
            `Failed to fetch data for ${selectedCountry.name}:`,
            error
          );

          if (error instanceof Error) {
            setCountryDataError(
              `Failed to fetch data for ${selectedCountry.name}: ${error.message}`
            );
          } else {
            setCountryDataError(
              `Failed to fetch data for ${selectedCountry.name}: Unknown error`
            );
          }
        } finally {
          setCountryDataLoading(false);
        }
      }
    };

    fetchCountryData();
  }, [selectedCountry]);

  // Automatically fetch data for the first country after fetching countries
  useEffect(() => {
    if (!selectedCountry && countries.length > 0) {
      setSelectedCountry(countries[0]);
    }
  }, [countries, selectedCountry]);

  return (
    <CountryContext.Provider
      value={{
        countries,
        selectedCountry,
        setSelectedCountry,
        countryData,
        loading: countryDataLoading,
        initialLoading,
        fatalError,
        countryDataError,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }
  return context;
};

export { CountryContext, CountryProvider };
