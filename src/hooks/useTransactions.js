import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTransaction,
  deleteTransaction,
  getMonthlySummary,
  getTransactions,
  updateTransaction,
} from "../api/transactionApi";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};

export const useMonthlySummary = () => {
  return useQuery({
    queryKey: ["monthly-summary"],
    queryFn: getMonthlySummary,
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-summary"] });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-summary"] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-summary"] });
    },
  });
};
