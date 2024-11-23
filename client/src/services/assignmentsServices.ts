import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, Assignment, AssignmentForm } from "@/types/types";
import { AxiosError } from "axios";

export const useGetAssignmentsInClass = (class_id: number) => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments_in_class", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/assignments/${class_id}`);
      return data;
    },
  });
};

export const useCreateAssignment = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, AssignmentForm>({
    mutationFn: async (assignmentData) => {
      const { data } = await apiClient.post("/assignments", assignmentData);
      return data;
    },
  });
};
