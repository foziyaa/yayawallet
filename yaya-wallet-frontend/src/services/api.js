import axios from 'axios';

// The Nest.js backend is running on port 3000 with a default '/api' prefix
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create an instance of axios with the base URL pre-configured
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Fetches transactions for a specific page.
 * Corresponds to the GET /api/transactions endpoint on our backend.
 * @param {number} page The page number to fetch.
 * @returns {Promise<Object>} The API response data.
 */
export const getTransactions = (page = 1) => {
  return apiClient.get(`/transactions`, { params: { p: page } });
};

/**
 * Searches for transactions based on a query.
 * Corresponds to the POST /api/transactions/search endpoint on our backend.
 * @param {string} query The search term.
 * @returns {Promise<Object>} The API response data.
 */
export const searchTransactions = (query) => {
  return apiClient.post('/transactions/search', { query });
};
