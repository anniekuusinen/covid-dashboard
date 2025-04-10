import React from "react";

interface DataCardProps {
  title: string;
  number: number;
  color: string; // Added color prop
}
const DataCard: React.FC<DataCardProps> = ({ title, number, color }) => {
  return (
    <div
      className={`flex flex-col items-start space-y-4 p-4 shadow-md rounded-lg border border-gray-200`}
      style={{ backgroundColor: color }}
    >
      <h4 className="text-sm text-white">{title}</h4>
      <span className="text-3xl font-bold text-white">{number}</span>
    </div>
  );
};

export default DataCard;
