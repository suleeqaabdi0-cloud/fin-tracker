import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, loginUser, registerUser } from "../api/authApi";
import { removeToken, setToken } from "../lib/token";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data?.token || data?.accessToken;
      if (token) {
        setToken(token);
      }

      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    removeToken();
    queryClient.clear();
  };

  return { logout };
};
