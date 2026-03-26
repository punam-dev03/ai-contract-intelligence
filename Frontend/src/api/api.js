import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});


// 🔐 Automatically attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// ===== CONTRACT APIs =====

export const uploadContract = (formData) =>
  API.post("/contracts/upload", formData);

export const simulateImpact = (data) =>
  API.post("/contracts/simulate", data);

export const compareContracts = (data) =>
  API.post("/comparison/compare", data);

export const fetchAnalytics = () =>
  API.get("/analytics/dashboard");

export const fetchMyContracts = () =>
  API.get("/contracts/my");


export default API;