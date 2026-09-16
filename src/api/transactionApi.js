import axiosInstance from "./axiosInstance";

export const getTransactions = async () => {
  const { data } = await axiosInstance.get("/transactions");
  return data;
};

export const addTransaction = async (payload) => {
  const { data } = await axiosInstance.post("/transactions", payload);
  return data;
};

export const updateTransaction = async ({ id, payload }) => {
  const { data } = await axiosInstance.put(`/transactions/${id}`, payload);
  return data;
};

export const deleteTransaction = async (id) => {
  const { data } = await axiosInstance.delete(`/transactions/${id}`);
  return data;
};

export const getMonthlySummary = async () => {
  const { data } = await axiosInstance.get("/transactions/monthly-summary");
  return data;
};
