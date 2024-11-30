import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, EnrollmentData } from "@/types/types";
import { AxiosError } from "axios";

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, EnrollmentData>({
    mutationFn: async (enrollmentData) => {
      const { data } = await apiClient.post("/enrollments", enrollmentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useUnenrollToClass = (student_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (class_id) => {
      const { data } = await apiClient.delete(
        `/enrollments/${student_id}/${class_id}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
