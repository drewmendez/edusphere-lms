import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, Class, ClassData, User } from "@/types/types";
import { AxiosError } from "axios";
import { useCurrentUser } from "@/context/CurrentUserContext";

export const useGetClasses = () => {
  const { currentUser } = useCurrentUser();
  const user_id = currentUser.user_id;

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
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassData>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.post("/classes", classData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (class_id) => {
      const { data } = await apiClient.delete(`/classes/${class_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useEditClass = (class_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassData>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.put(`/classes/${class_id}`, classData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
