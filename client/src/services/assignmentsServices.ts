import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import {
  ApiResponse,
  Assignment,
  AssignmentData,
  AssignmentSubmissionData,
  Submission,
  SubmissionData,
} from "@/types/types";
import { AxiosError } from "axios";

export const useGetAssignments = (
  user_id: number,
  filter: string,
  status?: string,
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

export const useGetAssignmentSubmissionData = (
  assignment_id: number,
  class_id: number,
) => {
  return useQuery<AssignmentSubmissionData>({
    queryKey: ["assignment-submission-data", assignment_id, class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/assignments/${assignment_id}/${class_id}/submission-data`,
      );
      return data;
    },
  });
};

export const useGetAssignmentsInClass = (class_id: number) => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments-in-class", class_id],
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

export const useSubmitGrade = (assignment_completion_id: number) => {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};
