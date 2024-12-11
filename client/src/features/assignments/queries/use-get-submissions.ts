import { useQuery } from "@tanstack/react-query";
import { Submission } from "../types";
import { apiClient } from "@/lib/api-client";

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
