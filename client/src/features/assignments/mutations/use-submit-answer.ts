import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmissionData } from "../types";

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, SubmissionData>({
    mutationFn: async (submissionData) => {
      const { data } = await apiClient.post(
        "/assignments/submissions",
        submissionData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission"] });
    },
  });
};
