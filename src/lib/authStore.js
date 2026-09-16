import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      // Hubi in magacyada (user, token) ay is leeyihiin
      setAuth: (userData, tokenData) =>
        set({ user: userData, token: tokenData }),
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // Tani waxay xogta ku dhex kaydinaysaa LocalStorage
    },
  ),
);

export default useAuthStore;
