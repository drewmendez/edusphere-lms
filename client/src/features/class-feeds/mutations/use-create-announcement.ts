import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AnnouncementData } from "../types";
import { apiClient } from "@/lib/api-client";

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, AnnouncementData>({
    mutationFn: async (announcementData) => {
      const { data } = await apiClient.post("/announcements", announcementData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-feeds"] });
    },
  });
};
