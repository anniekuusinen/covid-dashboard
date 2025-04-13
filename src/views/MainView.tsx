import React from 'react';
import { useCountryContext } from '../context/CountryContext';
import CountryView from './CountryView';
import StatisticsDisplay from './StatisticsDisplay';
import DarkModeToggle from '../components/DarkModeToggle';
import ErrorView from './ErrorView';

const MainView: React.FC = () => {
  const { initialLoading, fatalError, countryDataError } = useCountryContext();

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold">Loading Covid Dashboard...</p>
      </div>
    );
  }

  if (fatalError) {
    return <ErrorView error={fatalError} />;
  }

  return (
    <div className="relative p-6 flex flex-col items-center mx-auto bg-white dark:bg-gray-800 w-full min-h-screen">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-black-500 dark:text-gray-100 font-bold mb-10">
        Covid-19 Dashboard
      </h1>
      <DarkModeToggle />
      <CountryView />

      {countryDataError ? (
        <ErrorView error={countryDataError} />
      ) : (
        <StatisticsDisplay />
      )}
    </div>
  );
};

export default MainView;
