import axios from 'axios';

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured.');
}

export const apiClient = axios.create({
  baseURL: apiBaseURL.replace(/\/+$/, ''),
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});
