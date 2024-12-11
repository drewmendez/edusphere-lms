import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../types";
import { apiClient } from "@/lib/api-client";

export const useGetAssignment = (assignment_id: number) => {
  return useQuery<Assignment>({
    queryKey: ["assignment", assignment_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/assignments/${assignment_id}`);
      return data;
    },
  });
};
