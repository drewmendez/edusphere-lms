import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../types";
import { apiClient } from "@/lib/api-client";

export const useGetAssignments = (filter: string, status?: string) => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments", filter, status],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/assignments?filter=${filter}&status=${status}`,
      );
      return data;
    },
  });
};
