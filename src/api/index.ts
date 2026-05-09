import axios from 'axios';
import { useStore } from '../store/useStore';

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
});

// Перехватчик для добавления токена (для GET запросов он не обязателен, но требует ТЗ)
api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;