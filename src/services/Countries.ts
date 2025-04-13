import apiInstance from './AxiosConfig';
import { Country } from '../types/Country';

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getCountries = async () => {
  try {
    const response = await apiInstance.get('/regions');
    const { data } = response.data;

    const countries = data.map((country: Country) => ({
      name: country.name,
      iso: country.iso,
    })) ?? [];

    console.log('Mapped countries:', countries);
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getTotalReports = async (iso: string, date: string = getCurrentDate()) => {
  console.log(date);
  try {
    const response = await apiInstance.get('/reports/total', {
      params: {
        // Seems like this API is not updated for the current date
        // So I am  using a fixed date for now
        // Hopefully I get to discuss this more later on 
        date: '2020-03-14',
        iso,  
      },
    });

    const { data } = response.data;

    console.log('Fetched total reports:', response);
    return data;
  } catch (error) {
    console.error('Error fetching total reports:', error);
    throw error;
  }
};

