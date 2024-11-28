import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import {
  ApiResponse,
  Assignment,
  AssignmentData,
  Submission,
  SubmissionData,
} from "@/types/types";
import { AxiosError } from "axios";

export const useGetAssignments = (
  user_id: number,
  filter: string,
  status: string,
) => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments", user_id, filter, status],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/assignments/user/${user_id}?filter=${filter}&status=${status}`,
      );
      return data;
    },
  });
};

export const useGetAssignmentsInClass = (class_id: number) => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments_in_class", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/assignments/class/${class_id}`);
      return data;
    },
  });
};

export const useGetAssignment = (assignment_id: number) => {
  return useQuery<Assignment>({
    queryKey: ["assignment", assignment_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/assignments/${assignment_id}`);
      return data;
    },
  });
};

export const useCreateAssignment = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, AssignmentData>({
    mutationFn: async (assignmentData) => {
      const { data } = await apiClient.post("/assignments", assignmentData);
      return data;
    },
  });
};

export const useDeleteAssignment = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (assignment_id) => {
      const { data } = await apiClient.delete(`/assignments/${assignment_id}`);
      return data;
    },
  });
};

export const useGetSubmissions = (assignment_id: number, class_id: number) => {
  return useQuery<Submission[]>({
    queryKey: ["submissions", assignment_id, class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/assignments/submissions/${assignment_id}/${class_id}`,
      );
      return data;
    },
  });
};

export const useGetSubmission = (student_id: number, assignment_id: number) => {
  return useQuery<Submission>({
    queryKey: ["submission", student_id, assignment_id],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/assignments/submissions/student/${student_id}/${assignment_id}`,
      );
      return data;
    },
  });
};

export const useSubmitAnswer = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SubmissionData>({
    mutationFn: async (submissionData) => {
      const { data } = await apiClient.post(
        "/assignments/submissions",
        submissionData,
      );
      return data;
    },
  });
};

export const useSubmitGrade = (assignment_completion_id: number) => {
  return useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    { given_points: number }
  >({
    mutationFn: async (pointsData) => {
      const { data } = await apiClient.patch(
        `/assignments/submissions/${assignment_completion_id}`,
        pointsData,
      );
      return data;
    },
  });
};
