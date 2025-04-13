import { AxiosError } from 'axios';

export const handleApiError = (error: AxiosError): string => {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.data);
      const responseData = error.response.data as { message?: string };
      return responseData.message || 'An error occurred while fetching data.';
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
      return 'Network error. Please check your internet connection.';
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return 'An unexpected error occurred.';
    }
  };