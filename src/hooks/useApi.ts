import { useState } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

interface ApiResponse<T> {
  loading: boolean;
  error: AxiosError | null;
  get: (url: string) => Promise<T>;
  post: (url: string, data: any) => Promise<T>;
}

const api = axios.create({
  baseURL: process.env.PUBLIC_APP_AUTH_URL,
});

const useApi = <T>(): ApiResponse<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  api.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const makeRequest = async (
    method: AxiosRequestConfig["method"],
    url: string,
    data: any = null
  ) => {
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
    return makeRequest("GET", url);
  };

  const post = async (url: string, data: any) => {
    return makeRequest("POST", url, data);
  };

  return { loading, error, get, post };
};

export default useApi;
