# Covid-dashboard

## Overview

This assignment involves building a COVID-19 Dashboard using public APIs. The goal is to create a responsive, user-friendly web application that allows users to view COVID-19 statistics for different countries. The project requires the use of React with functional components and Hooks, effective state management, and integration with public APIs for real-time data. The dashboard should feature a country selector, display relevant statistics, and optionally, show trends through a chart.

## Features

- Fetch COVID-19 data from public APIs.

- Display statistics for confirmed cases, recovered cases, and deaths for the selected country.

- Responsive and user-friendly interface.

- Allows users to select a country from a dropdown.

- Handle loading states, errors, and data caching.

- Built with TypeScript for type safety.

## Components

- Country Selector Component

  - Displays a dropdown list of countries fetched from the API.

  - Allows users to select a country to view its COVID-19 statistics.

- Statistics Component

  - Confirmed cases

  - Recovered cases

  - Deaths

## Technologies Used

- Frontend: React, TypeScript, Context API

- Styling: Tailwind CSS for responsive UI

- API Integration: for fetching data

## How to run

1. Clone the repository: `git clone https://github.com/anniekuusinen/task-management.git`
2. Install dependencies:
   `cd covid-dashboard && npm install`
3. Start the development server:
   `npm run dev`

## Additional Notes

- The project uses public APIs for fetching real-time COVID-19 data. You can choose between COVID19API or Disease.sh for integration.

- Tailwind CSS is used for styling the UI with responsive and modern designs.

- TypeScript ensures type safety for the components and API responses.

## Bonus Features

- Dark Mode: Implement a toggle to switch between light and dark themes.

- Unit Tests: Write tests for the components using React Testing Library and Jest.

- Caching: Data fetched from the API is cached to avoid unnecessary re-fetching.
