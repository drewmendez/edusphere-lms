import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { ClassFeed } from "@/types/types";

export const useGetClassFeeds = (class_id: number) => {
  return useQuery<ClassFeed[]>({
    queryKey: ["class-feeds", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/class-feeds/${class_id}`);
      return data;
    },
  });
};
