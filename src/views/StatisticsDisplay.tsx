import React from 'react';
import DataCard from '../components/DataCard';
import { useCountryContext } from '../context/CountryContext';

const StatisticsDisplay: React.FC = () => {
  const { countryData } = useCountryContext(); 

  const statistics = [
    {
      title: 'Confirmed Cases',
      value: countryData?.confirmed || 0,
      color: '#354a60',
    },
    { title: 'Deaths', value: countryData?.deaths || 0, color: '#e64b3e' },
    {
      title: 'Recovered',
      value: countryData?.recovered || 0,
      color: '#14a085',
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
