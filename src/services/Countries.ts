// create a service to get countries from the API
import apiInstance from './axiosConfig';
import { Country } from '../types/Country';

// Function to fetch the list of countries
export const getCountries = async () => {
    try {
        const response = await apiInstance.get('/regions');

      const countries = response.data.data.map((country: Country) => ({
        region: country.name,
        name: country.name,
      })) ?? [];
  
      console.log('Mapped countries:', countries);
      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  };