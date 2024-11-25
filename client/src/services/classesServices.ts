import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, Class, ClassData, User } from "@/types/types";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

export const useGetClasses = () => {
  const { currentUserQuery } = useAuth();
  const user_id = currentUserQuery.data?.user_id;

  return useQuery<Class[]>({
    queryKey: ["classes", user_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/user/${user_id}`);
      return data;
    },
  });
};

export const useGetClass = (class_id: number) => {
  return useQuery<Class>({
    queryKey: ["class", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/${class_id}`);
      return data;
    },
  });
};

export const useGetPeopleInClass = (class_id: number) => {
  return useQuery<User[]>({
    queryKey: ["people", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/people/${class_id}`);
      return data;
    },
  });
};

export const useCreateClass = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassData>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.post("/classes", classData);
      return data;
    },
  });
};

export const useDeleteClass = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (class_id) => {
      const { data } = await apiClient.delete(`/classes/${class_id}`);
      return data;
    },
  });
};

export const useEditClass = (class_id: number) => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassData>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.put(`/classes/${class_id}`, classData);
      return data;
    },
  });
};
