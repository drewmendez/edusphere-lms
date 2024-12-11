import { useQuery } from "@tanstack/react-query";
import { ClassFeed } from "../types";
import { apiClient } from "@/lib/api-client";

export const useGetClassFeeds = (class_id: number) => {
  return useQuery<ClassFeed[]>({
    queryKey: ["class-feeds", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/class-feeds/${class_id}`);
      return data;
    },
  });
};
