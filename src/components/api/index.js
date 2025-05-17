import axios from 'axios';

// Create Axios instance with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token') || import.meta.env.VITE_BASE_TOKEN;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx will trigger this function
    return response;
  },
  error => {
    // Any status codes outside the range of 2xx will trigger this function
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      if (status === 401) {
        // Handle 401 Unauthorized
        console.error('Authentication failed. Please check your credentials.');
        errorMessage = 'Authentication failed. Please log in again.';

        // If token expired, clear it and redirect to login
        localStorage.removeItem('auth_token');
      } else if (status === 403) {
        // Handle 403 Forbidden
        errorMessage = 'You do not have permission to access this resource.';
      } else if (status === 404) {
        // Handle 404 Not Found
        errorMessage = 'The requested resource was not found.';
      } else if (status >= 500) {
        // Handle server errors
        errorMessage = 'Server error. Please try again later.';
      }

      // Use error message from response if available
      if (data && data.message) {
        errorMessage = data.message;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      errorMessage = 'No response from server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request setup error:', error.message);
      errorMessage = error.message;
    }

    // Add error message to the error object for easier access
    error.displayMessage = errorMessage;

    return Promise.reject(error);
  }
);

// API service with helper methods
const apiService = {
  // GET request
  get: async (url, params = {}) => {
    try {
      const response = await apiClient.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request with JSON body
  post: async (url, data = {}) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request with FormData
  postForm: async (url, formData) => {
    try {
      const response = await apiClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  patch: async (url, data = {}) => {
    try {
      const response = await apiClient.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request with FormData
  patchForm: async (url, formData) => {
    try {
      const response = await apiClient.patch(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (url) => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get the Axios instance for custom use cases
  getInstance: () => apiClient
};

export default apiService;
