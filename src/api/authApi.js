import axiosInstance from "./axiosInstance";

export const loginUser = async (payload) => {
  const { data } = await axiosInstance.post("/auth/login", payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await axiosInstance.post("/auth/register", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};
