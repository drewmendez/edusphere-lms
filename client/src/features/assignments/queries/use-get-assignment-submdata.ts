import { apiClient } from "@/lib/api-client";
import { AssignmentSubmissionData } from "../types";
import { useQuery } from "@tanstack/react-query";

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
