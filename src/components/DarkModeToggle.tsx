import React, { useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center cursor-pointer fixed top-4 right-4">
      <span className="text-sm font-medium text-gray-800 dark:text-white">
        Light Mode
      </span>

      <label className="flex items-center mx-4">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="hidden"
        />

        <div className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-amber-800">
          <div
            className={`dot absolute top-1 left-1 w-6 h-6 rounded-full transition ${
              isDarkMode ? 'translate-x-full bg-white' : 'bg-gray-800'
            }`}
          ></div>
        </div>
      </label>

      <span className="text-sm font-medium text-gray-800 dark:text-white">
        Dark Mode
      </span>
    </div>
  );
};

export default DarkModeToggle;
