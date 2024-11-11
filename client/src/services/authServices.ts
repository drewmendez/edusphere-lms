import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { SignInForm, SignUpForm } from "@/types/types";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (userData: SignUpForm) => {
      const { data } = await apiClient.post("/auth/sign-up", userData);
      return data;
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (credentials: SignInForm) => {
      const { data } = await apiClient.post("/auth/sign-in", credentials);
      return data;
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post("/auth/sign-out");
      return data;
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get("/auth/current-user");
        return data;
      } catch {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
