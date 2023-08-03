import axios from "axios";

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "security-code": "66e15e52dce6f36e224218fd",
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Add a request interceptor
