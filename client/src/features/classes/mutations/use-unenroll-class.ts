import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUnenrollClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (class_id) => {
      const { data } = await apiClient.delete(`/enrollments/${class_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
