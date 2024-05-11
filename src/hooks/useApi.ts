import { useState } from 'react';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

interface ApiResponse<T> {
  loading: boolean;
  error: AxiosError | null;
  get: (url: string) => Promise<T>;
  post: (url: string, data: any) => Promise<T>;
  setAuthToken: (token: string | null) => void;
}

const useApi = <T>() : ApiResponse<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const [token, setToken] = useState<string | null>(null);

  // Function to set the token
  const setAuthToken = (token: string | null) => {
    setToken(token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  const makeRequest = async (method: AxiosRequestConfig['method'], url: string, data: any = null) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await api.request({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error) {
      setError(error as AxiosError);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const get = async (url: string) => {
    return makeRequest('GET', url);
  };

  const post = async (url: string, data: any) => {
    return makeRequest('POST', url, data);
  };

  return { loading, error, get, post, setAuthToken };
};

export default useApi;
