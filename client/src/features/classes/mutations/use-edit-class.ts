import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ClassData } from "../types";
import { apiClient } from "@/lib/api-client";

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
