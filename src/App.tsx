import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import StatisticsDisplay from "./components/StatisticsDisplay";
import CountrySelector from "./components/CountrySelector";

const App: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState("apple");

  const fruitOptions = [
    { label: "Apple 🍎", value: "apple" },
    { label: "Banana 🍌", value: "banana" },
    { label: "Orange 🍊", value: "orange" },
  ];

  const colors = [
    { color: "#354a60" },
    { color: "#14a085" },
    { color: "#e64b3e" },
  ];

  return (
    <div className="p-6 flex flex-col items-center  mx-auto bg-white dark:bg-black w-full min-h-screen">
      <h1 className="text-center text-4xl text-black-500 dark:text-white font-bold mb-10">
        Covid-19 Dashboard
      </h1>
      <Dropdown
        label="Choose a fruit"
        options={fruitOptions}
        value={selectedFruit}
        onChange={setSelectedFruit}
      />
      <CountrySelector></CountrySelector>
      <p className="mt-4 text-gray-700">
        You selected: <strong>{selectedFruit}</strong>
      </p>
      <div className="flex flex-row gap-4 mt-4 w-full justify-center">
        {colors.map((card, index) => (
          <StatisticsDisplay
            key={index}
            title={`Fetching title for card ${index + 1}...`}
            number={0}
            color={card.color}
          />
        ))}
      </div>
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default App;
