import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { Student } from "@/types/types";

export const useGetStudentsInClass = (class_id: number) => {
  return useQuery<Student[]>({
    queryKey: ["students", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/enrollments/${class_id}`);
      return data;
    },
  });
};
