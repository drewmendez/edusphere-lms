import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, EnrollmentData, Student } from "@/types/types";
import { AxiosError } from "axios";

export const useGetStudentsInClass = (class_id: number) => {
  return useQuery<Student[]>({
    queryKey: ["students", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/enrollments/${class_id}`);
      return data;
    },
  });
};

export const useJoinClass = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, EnrollmentData>({
    mutationFn: async (enrollmentData) => {
      const { data } = await apiClient.post("/enrollments", enrollmentData);
      return data;
    },
  });
};

export const useUnenrollToClass = (student_id: number) => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (class_id) => {
      const { data } = await apiClient.delete(
        `/enrollments/${student_id}/${class_id}`,
      );
      return data;
    },
  });
};
