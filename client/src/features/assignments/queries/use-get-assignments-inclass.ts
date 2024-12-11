import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../types";
import { apiClient } from "@/lib/api-client";

export const useGetAssignmentsInClass = (class_id: number) => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments-in-class", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/assignments/class/${class_id}`);
      return data;
    },
  });
};
