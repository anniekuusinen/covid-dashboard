import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,

  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default apiInstance;
