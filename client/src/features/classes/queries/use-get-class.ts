import { useQuery } from "@tanstack/react-query";
import { Class } from "../types";
import { apiClient } from "@/lib/api-client";

export const useGetClass = (class_id: number) => {
  return useQuery<Class>({
    queryKey: ["class", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes/${class_id}`);
      return data;
    },
  });
};
