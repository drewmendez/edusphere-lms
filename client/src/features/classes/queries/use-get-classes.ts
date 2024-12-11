import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Class } from "../types";

export const useGetClasses = () => {
  return useQuery<Class[]>({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await apiClient.get(`/classes`);
      return data;
    },
  });
};
