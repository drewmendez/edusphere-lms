import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AssignmentData } from "../types";

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, AssignmentData>({
    mutationFn: async (assignmentData) => {
      const { data } = await apiClient.post("/assignments", assignmentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments-in-class"] });
    },
  });
};
