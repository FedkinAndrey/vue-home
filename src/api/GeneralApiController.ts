import axios, { AxiosInstance } from 'axios';

class GeneralApiController {
  public http: AxiosInstance;

  constructor({ returnOnlyData = true } = {}) {
    this.http = axios.create({
      baseURL: 'http://localhost:5001',
      withCredentials: true,
    });

    this.http.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = token;
        }

        return config;
      },
      (error) => {
        if (import.meta.env.VUE_APP_DEBUG) {
          console.warn('API REQUEST ERROR', error);
        }
      }
    );

    this.http.interceptors.response.use(
      (response) => {
        return returnOnlyData
          ? { ...response.data, success: true, headers: response.headers }
          : {
              ...response,
              data: {
                ...response.data,
                success: true,
                headers: response.headers,
              },
            };
      },
      (error) => {
        if (import.meta.env.VUE_APP_DEBUG) {
          console.warn('API RESPONSE ERROR', error);
        }
        const response = error?.response;

        if (!response) {
          console.log(error);
          return error;
        }

        return response.data;
      }
    );
  }
}

export default GeneralApiController;
