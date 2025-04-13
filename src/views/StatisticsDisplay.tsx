import React from 'react';
import DataCard from '../components/DataCard';
import { useCountryContext } from '../context/CountryContext';
import { LOADING_TEXT, NA_TEXT, STATISTICS_COLORS } from '../utils/constants';

const StatisticsDisplay: React.FC = () => {
  const { countryData, loading } = useCountryContext();

  const statistics = [
    {
      title: 'Confirmed Cases',
      value: loading ? LOADING_TEXT : countryData?.confirmed || NA_TEXT,
      color: STATISTICS_COLORS.confirmed,
    },
    {
      title: 'Recovered',
      value: loading ? LOADING_TEXT : countryData?.recovered || NA_TEXT,
      color: STATISTICS_COLORS.recovered,
    },
    {
      title: 'Deaths',
      value: loading ? LOADING_TEXT : countryData?.deaths || NA_TEXT,
      color: STATISTICS_COLORS.deaths,
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-4 mt-20 w-full justify-center">
      {statistics.map((stat, index) => (
        <DataCard
          key={index}
          title={stat.title}
          number={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatisticsDisplay;
