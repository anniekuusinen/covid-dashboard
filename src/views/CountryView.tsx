import React from 'react';
import Dropdown from '../components/Dropdown';
import { useCountryContext } from '../context/CountryContext';

const CountryView: React.FC = () => {
  const { countries, setSelectedCountry, selectedCountry } =
    useCountryContext();

  const handleCountryChange = (countryName: string) => {
    const selected = countries.find((country) => country.name === countryName);
    if (selected) {
      setSelectedCountry(selected);
    }
  };

  const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  return (
    <>
      <Dropdown
        options={countryOptions}
        onChange={handleCountryChange}
        label="Select a country"
        value={selectedCountry?.name || ''}
      />
      <div className="text-center mt-5">
        <p className="text-gray-700 dark:text-gray-200 sm:text-lg md:text-xl inline">
          Showing Covid Data For Country:
        </p>
        {selectedCountry && (
          <span className="text-gray-700 dark:text-gray-100 text-center sm:text-lg md:text-xl ml-2 font-bold">
            {selectedCountry.name}
          </span>
        )}
      </div>
    </>
  );
};

export default CountryView;
