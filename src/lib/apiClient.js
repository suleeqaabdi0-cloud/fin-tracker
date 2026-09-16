import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-tracker-1-1wka.onrender.com/api",
});

// Kani wuxuu Token-ka ka soo qabanayaa LocalStorage ka hor codsi kasta
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Hubi magaca aad u bixisay
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
