import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { User } from "@/types/types";

export const useGetPeopleInClass = (class_id: number) => {
  return useQuery<User[]>({
    queryKey: ["people", class_id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/users/${class_id}`);
      return data;
    },
  });
};
