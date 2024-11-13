import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, Class, ClassForm } from "@/types/types";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

export const useGetClasses = () => {
  const { currentUserQuery } = useAuth();
  const user_id = currentUserQuery.data?.user_id;

  return useQuery<Class[]>({
    queryKey: ["classes", user_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/${user_id}`);
      return data;
    },
  });
};

export const useCreateClass = () => {
  const { currentUserQuery } = useAuth();
  const teacher_id = currentUserQuery.data?.user_id;

  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassForm>({
    mutationFn: async (classData) => {
      const { data } = await apiClient.post(
        `/classes/${teacher_id}`,
        classData,
      );
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
