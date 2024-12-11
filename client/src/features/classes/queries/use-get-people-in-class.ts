import { useCurrentUser } from "@/context/CurrentUserContext";
import { apiClient } from "@/lib/api-client";
import { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPeopleInClass = (class_id: number) => {
  const { currentUser } = useCurrentUser();

  return useQuery({
    queryKey: ["people", class_id],
    queryFn: async (): Promise<User[]> => {
      const { data } = await apiClient.get(`/classes/people/${class_id}`);
      return data;
    },
    select: (people) => {
      return {
        teacher: people.find((person) => person.role === "teacher"),
        students:
          currentUser.role === "teacher"
            ? people.filter((person) => person.role === "student")
            : people.filter(
                (person) =>
                  person.role === "student" &&
                  person.user_id !== currentUser.user_id,
              ),
        numberOfStudents: people.length - 1,
      };
    },
  });
};
