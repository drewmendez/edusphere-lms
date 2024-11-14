import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ApiResponse, ClassCodeForm, Student } from "@/types/types";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

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
  const { currentUserQuery } = useAuth();
  const student_id = currentUserQuery.data?.user_id;

  return useMutation<ApiResponse, AxiosError<ApiResponse>, ClassCodeForm>({
    mutationFn: async (classCodeData) => {
      const { data } = await apiClient.post(
        `/enrollments/${student_id}`,
        classCodeData,
      );
      return data;
    },
  });
};
