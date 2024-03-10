import axios, { AxiosInstance } from 'axios';

class GeneralApiController {
  public http: AxiosInstance;

  constructor() {
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
        // Modify the response.data object directly if you need to add custom properties
        const modifiedData = {
          data: response.data,
          // headers: response.headers,
          success: true, // Add custom properties within the data object
        };

        // Return the entire response object with the modified data
        return {
          ...response,
          data: modifiedData,
        };
      },
      (error) => {
        console.log(error);
        if (import.meta.env.VUE_APP_DEBUG) {
          console.warn('API RESPONSE ERROR', error);
        }
        const response = error?.response;

        if (!response) {
          console.log(error);
          return Promise.reject(error); // Ensure to reject the promise with the error
        }

        // Optionally modify error.response.data or handle it as needed
        return Promise.reject(response.data); // Reject with the modified data
      }
    );
  }
}

export default GeneralApiController;
