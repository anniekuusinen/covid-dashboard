import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Country } from '../types/Country';
import { CountryData } from '../types/CountryData';
import { getCountries, getTotalReports } from '../services/Countries';

interface CountryContextType {
  countries: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
  countryData: CountryData | null; 
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryData, setCountryData] = useState<CountryData | null>(null);

  // Fetch countries when the provider is mounted
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch data for the selected country whenever it changes
  useEffect(() => {
    const fetchCountryData = async () => {
      if (selectedCountry) {
        try {
          const data = await getTotalReports(selectedCountry.iso);
          console.log('Fetched country data:', data);
          setCountryData(data);
        } catch (error) {
          console.error('Failed to fetch country data:', error);
        }
      }
    };

    fetchCountryData();
  }, [selectedCountry]);

  return (
    <CountryContext.Provider
      value={{ countries, selectedCountry, setSelectedCountry, countryData }}
    >
      {children}
    </CountryContext.Provider>
  );
};

// Custom hook to use the CountryContext
export const useCountryContext = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }
  return context;
};

export { CountryContext, CountryProvider };
