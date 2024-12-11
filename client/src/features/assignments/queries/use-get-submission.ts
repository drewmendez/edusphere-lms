import { useQuery } from "@tanstack/react-query";
import { Submission } from "../types";
import { apiClient } from "@/lib/api-client";

export const useGetSubmission = (assignment_id: number) => {
  return useQuery<Submission>({
    queryKey: ["submission", assignment_id],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/assignments/submissions/${assignment_id}`,
      );
      return data;
    },
  });
};
