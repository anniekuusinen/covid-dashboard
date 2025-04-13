# Covid-dashboard

## Overview

This project involves building a COVID-19 Dashboard using public API. The dashboard is responsive, user-friendly web application that allows users to view COVID-19 statistics for different countries. 

## Features

- Fetch COVID-19 data from public APIs.

- Display statistics for confirmed cases, recovered cases, and deaths for the selected country.

- Responsive and user-friendly interface.

- Allows users to select a country from a dropdown.

- Handle loading states, errors, and data caching.

- Built with TypeScript.

## Components

- Dropdown Component: a selector with label
- DataCard Component: display individual statistics (e.g., confirmed cases, recovered cases, deaths) with appropriate styling.
- Dark Mode Toggle:  Provides a switch to toggle between light and dark themes for the application.

## Views
- Country View that prompt user to select a country and shows a list of countries fetched from API.
- Statistics Display that shows three different report cards for confirmed cases, recovered cases and deaths.
- Error View displays error to users should there be something wrong.

## Technologies Used

### Frontend
- React: For building the user interface.
- TypeScript: Ensures type safety and better developer experience.
- Context API: For state management across components.

### Styling
- Tailwind CSS: Provides a utility-first approach for responsive and modern UI design.

### API Integration
- Public API: Used for fetching real-time COVID-19 data.

## How to run the application

1. Clone the repository: `git clone https://github.com/anniekuusinen/covid-dashboard.git`
2. Install dependencies:
   `cd covid-dashboard && npm install`
3. Start the development server:
   `npm run dev`

## Unit Tests

- Unit tests are implemented using React Testing Library, Jest, and Vitest.

- These tests help maintain code quality and catch potential issues during development.

### How to Run Unit Tests

- To run the test suite and ensure the application components are functioning as expected, use the following command:

```bash
npm run test
```

- To run the UI test suite and verify the application's user interface functionality, use the following command:

```bash
npm run test:ui
```

## Bonus Features

- Dark Mode: Implement a toggle to switch between light and dark themes.

- Unit Tests: Write tests for the components using Vitest, React Testing Library and Jest.

- Caching: Data fetched from the API is cached to avoid unnecessary re-fetching.
