import React from 'react';
import { useCountryContext } from '../context/CountryContext';
import CountryView from './CountryDisplay';
import StatisticsDisplay from './StatisticsDisplay';
import DarkModeToggle from '../components/DarkModeToggle';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

const MainView: React.FC = () => {
  const { initialLoading, fatalError, countryDataError } = useCountryContext();

  if (initialLoading) {
    return <Loading />;
  }

  if (fatalError) {
    return <ErrorMessage error={fatalError} />;
  }

  return (
    <div className="relative p-6 flex flex-col items-center mx-auto bg-white dark:bg-gray-800 w-full min-h-screen">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-black-500 dark:text-gray-100 font-bold mb-10">
        Covid-19 Dashboard
      </h1>
      <DarkModeToggle />
      <CountryView />

      {countryDataError ? (
        <ErrorMessage error={countryDataError} />
      ) : (
        <StatisticsDisplay />
      )}
    </div>
  );
};

export default MainView;
