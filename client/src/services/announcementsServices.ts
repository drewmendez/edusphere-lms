import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { AnnouncementData, ApiResponse } from "@/types/types";
import { AxiosError } from "axios";

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

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, number>({
    mutationFn: async (announcement_id) => {
      const { data } = await apiClient.delete(
        `/announcements/${announcement_id}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-feeds"] });
    },
  });
};
