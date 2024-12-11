import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (assignment_id) => {
      const { data } = await apiClient.delete(`/assignments/${assignment_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments-in-class"] });
    },
  });
};
