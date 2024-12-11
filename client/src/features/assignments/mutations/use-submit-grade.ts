import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
