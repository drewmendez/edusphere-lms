import { Folder, Home, ListTodo } from "lucide-react";

export const SIDEBAR_ITEMS = {
  teacher: [
    {
      icon: <Home />,
      link: "/dashboard",
      page: "dashboard",
      text: "Home",
    },
    {
      icon: <Folder />,
      link: "/to-review/not-reviewed/all",
      page: "to-review",
      text: "To Review",
    },
  ],
  student: [
    {
      icon: <Home />,
      link: "/dashboard",
      page: "dashboard",
      text: "Home",
    },
    {
      icon: <ListTodo />,
      link: `/to-do/assigned/all`,
      page: "to-do",
      text: "To Do",
    },
  ],
};
