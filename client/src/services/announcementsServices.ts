import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { AnnouncementData, ApiResponse } from "@/types/types";
import { AxiosError } from "axios";

export const useCreateAnnouncement = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, AnnouncementData>({
    mutationFn: async (announcementData) => {
      const { data } = await apiClient.post("/announcements", announcementData);
      return data;
    },
  });
};
