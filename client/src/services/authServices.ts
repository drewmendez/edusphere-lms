import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, SignInForm>({
    mutationFn: async (credentials) => {
      const { data } = await apiClient.post("/auth/sign-in", credentials);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>>({
    mutationFn: async () => {
      const { data } = await apiClient.post("/auth/sign-out");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/current-user");
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
