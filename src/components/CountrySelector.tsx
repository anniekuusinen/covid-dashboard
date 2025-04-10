import React, { useState, useEffect } from "react";

interface Country {
  name: string;
  code: string;
}

const CountrySelector: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map(
          (country: { name: { common: string }; cca2: string }) => ({
            name: country.name.common,
            code: country.cca2,
          })
        );
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <label className="block text-xxl font-medium text-gray-700 dark:text-white">
        Select a country:
      </label>
      <select
        id="country-selector"
        value={selectedCountry}
        onChange={handleChange}
        className="p-2 mt-1 block w-full min-w-150 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 pr-8 appearance-none dark:text-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1rem 1rem",
        }}
      >
        <option value="">-- Select a country --</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <p className="mt-4 text-gray-700 dark:text-white text-center">
          <strong>
            {countries.find((country) => country.code === selectedCountry)
              ?.name || selectedCountry}
          </strong>
        </p>
      )}
    </div>
  );
};

export default CountrySelector;
