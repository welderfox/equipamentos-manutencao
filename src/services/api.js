import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useApi = () => {
  const { token } = useAuth();
  
  const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true, // Importante para suportar cookies/sessões
  });

  return api;
};
