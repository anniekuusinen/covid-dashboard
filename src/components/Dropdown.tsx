import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const id = `dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="mb-4 w-full max-w-sm md:max-w-md lg:max-w-lg">
      <label
        htmlFor={id}
        className="block text-base md:text-lg lg:text-xl font-medium text-gray-700 dark:text-white mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full p-2 pr-8 borderborder-gray-300 dark:border-gray-50 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:ring-opacity-50 appearance-none dark:text-gray-800 dark:bg-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239CA3AF'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1rem 1rem',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
