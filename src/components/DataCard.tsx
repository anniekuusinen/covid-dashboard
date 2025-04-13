import React from 'react';

interface DataCardProps {
  title: string;
  number: number;
  color: string;
}
const DataCard: React.FC<DataCardProps> = ({ title, number, color }) => {
  return (
    <div
      className={`flex flex-col items-start space-y-2 sm:space-y-3 md:space-y-4 p-4 sm:p-6 md:p-8 shadow-md rounded-lg border border-gray-200 w-11/12 sm:w-2/3 md:w-1/3 max-w-sm`}
      style={{ backgroundColor: color }}
    >
      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white">
        {title}
      </h4>
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        {number}
      </span>
    </div>
  );
};

export default DataCard;
