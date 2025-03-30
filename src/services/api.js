import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useApi = () => {
  const { token } = useAuth();
  
  const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL da sua API
    headers: {
      'Authorization': `${token}`,
    },
  });

  return api;
};
