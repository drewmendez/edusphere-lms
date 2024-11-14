import { z } from "zod";

export const SignUpFormSchema = z.object({
  firstname: z.string().trim().min(1, "This field is required"),
  lastname: z.string().trim().min(1, "This field is required"),
  role: z.string({ message: "This field is required" }),
  email: z.string().trim().min(1, "This field is required").email(),
  password: z.string().trim().min(1, "This field is required"),
});

export type SignUpForm = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().trim().min(1, "This field is required").email(),
  password: z.string().trim().min(1, "This field is required"),
});

export type SignInForm = z.infer<typeof SignInFormSchema>;

export const ClassFormSchema = z.object({
  class_subject: z.string().trim().min(1, "This field is required"),
  class_section: z.string().trim().min(1, "This field is required"),
});

export type ClassForm = z.infer<typeof ClassFormSchema>;

export const ClassCodeFormSchema = z.object({
  class_code: z.string().trim().min(6, "Class codes are 6 characters long"),
});

export type ClassCodeForm = z.infer<typeof ClassCodeFormSchema>;

export type ApiResponse = {
  success: boolean;
  error?: string;
  message: string;
};

export type CurrentUser = {
  user_id: number;
  user: string;
  role: "teacher" | "student";
};

export type Class = {
  class_id: number;
  class_subject: string;
  class_code: string;
  banner_color: string;
  class_section: string;
  class_teacher?: string;
};

export type Student = {
  student_id: number;
};
