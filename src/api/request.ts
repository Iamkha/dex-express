import { getCookie } from "@/components/cookies";
import axios from "axios";

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "security-code": "66e15e52dce6f36e224218fd",
    "Content-Type": "application/json; charset=utf-8",
    gmail_user: getCookie("emailUser"),
  },
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
  if (getCookie("emailUser")) {
    config.headers.Authorization = `Bearer ${getCookie("emailUser")}`;
    return config;
  }
  return config;
});
