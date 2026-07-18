import axios from "axios";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured.");
}

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Accept: "application/json",
  },
});
