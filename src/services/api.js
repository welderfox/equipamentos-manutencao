import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useApi = () => {
  const { token } = useAuth();
  
  const api = axios.create({
    baseURL: 'http://localhost:8080', // URL da sua API
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    },
  });

  return api;
};
