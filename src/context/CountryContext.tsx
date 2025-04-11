import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Country } from '../types/Country';
import { getCountries } from '../services/countries';

// Define the shape of the context
interface CountryContextType {
  countries: Country[];
  selectedCountry: string | null;
  setSelectedCountry: (country: string) => void;
}

// Create the context
const CountryContext = createContext<CountryContextType | undefined>(undefined);

// Provider component
const CountryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    // Fetch countries when the provider is mounted
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        console.log(data);
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider
      value={{ countries, selectedCountry, setSelectedCountry }}
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
// Custom hook to use the CountryContext
export { CountryContext, CountryProvider };
