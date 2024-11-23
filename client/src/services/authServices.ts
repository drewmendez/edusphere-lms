import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, User, SignInForm, SignUpForm } from "@/types/types";
import { AxiosError } from "axios";

export const useSignUp = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SignUpForm>({
    mutationFn: async (userData) => {
      const { data } = await apiClient.post("/auth/sign-up", userData);
      return data;
    },
  });
};

export const useSignIn = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SignInForm>({
    mutationFn: async (credentials) => {
      const { data } = await apiClient.post("/auth/sign-in", credentials);
      return data;
    },
  });
};

export const useSignOut = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>>({
    mutationFn: async () => {
      const { data } = await apiClient.post("/auth/sign-out");
      return data;
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery<User | null>({
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
