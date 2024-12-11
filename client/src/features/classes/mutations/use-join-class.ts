import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EnrollmentForm } from "../types";
import { apiClient } from "@/lib/api-client";

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, EnrollmentForm>({
    mutationFn: async (enrollmentData) => {
      const { data } = await apiClient.post("/enrollments", enrollmentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
