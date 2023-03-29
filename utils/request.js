import axios from "axios";

export const barcodeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENAPI_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const infoRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default request;
