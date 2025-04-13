import React, { useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center cursor-pointer fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 mt-3 sm:mt-0">
      <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white hidden sm:block">
        Light Mode
      </span>

      <label className="flex items-center mx-2 sm:mx-4">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="hidden"
        />

        <div className="relative w-12 h-6 sm:w-14 sm:h-8 rounded-full bg-gray-300 dark:bg-amber-800">
          <div
            className={`dot absolute top-1 left-1 w-4 h-4 sm:w-6 sm:h-6 rounded-full transition ${
              isDarkMode ? 'translate-x-full bg-white' : 'bg-gray-800'
            }`}
          ></div>
        </div>
      </label>

      <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white hidden sm:block">
        Dark Mode
      </span>
    </div>
  );
};

export default DarkModeToggle;
