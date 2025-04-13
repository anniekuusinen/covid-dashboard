import apiInstance from './AxiosConfig';
import { Country } from '../types/Country';
import { handleApiError } from '../utils/errorHandler';
import { AxiosError } from 'axios';

export const getCountries = async () => {
  try {
    const response = await apiInstance.get('/regions');
    const { data } = response.data;

    const countries = data.map((country: Country) => ({
      name: country.name,
      iso: country.iso,
    })) ?? [];

    return countries;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const getTotalReports = async (iso: string) => {
  try {
    const response = await apiInstance.get('/reports/total', {
      params: {
        // Seems like this API is not being updated and using a fixed date to display data
        date: '2021-03-14',
        iso,  
      },
    });

    const { data } = response.data;
    return data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

