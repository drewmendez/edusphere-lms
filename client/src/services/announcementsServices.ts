import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { useAuth } from "@/context/AuthContext";
import { AnnouncementForm, ApiResponse } from "@/types/types";
import { AxiosError } from "axios";

export const useCreateAnnouncement = () => {
  const { currentUserQuery } = useAuth();
  const announcer_id = currentUserQuery.data?.user_id;

  return useMutation<ApiResponse, AxiosError<ApiResponse>, AnnouncementForm>({
    mutationFn: async (announcement) => {
      const { data } = await apiClient.post(
        `/announcements/${announcer_id}`,
        announcement,
      );
      return data;
    },
  });
};
