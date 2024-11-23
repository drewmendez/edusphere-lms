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
export type ClassData = ClassForm & {
  teacher_id?: number;
  class_id?: number;
};

export const EnrollmentFormSchema = z.object({
  class_code: z.string().trim().min(6, "Class codes are 6 characters long"),
});
export type EnrollmentForm = z.infer<typeof EnrollmentFormSchema>;
export type EnrollmentData = EnrollmentForm & {
  student_id: number;
};

export type UnenrollmentData = {
  class_id: number;
};

export const AssignmentFormSchema = z.object({
  title: z.string().trim().min(1, "This field is required"),
  description: z.string().trim().min(1, "This field is required"),
});
export type AssignmentForm = z.infer<typeof AssignmentFormSchema> & {
  class_id: number;
  creator_id: number;
};

export type AnnouncementData = {
  class_id: number;
  announcement: string;
  announcer_id: number;
};

export type Assignment = {
  assignment_id: number;
  title: string;
  description: string;
  created_at: string;
};

export type ApiResponse = {
  success: boolean;
  error?: string;
  message: string;
};

export type User = {
  user_id: number;
  user: string;
  role: "teacher" | "student";
};

export type Class = {
  class_id: number;
  class_subject: string;
  class_code?: string;
  banner_color: string;
  class_section: string;
  class_teacher?: string;
};

export type Student = {
  student_id: number;
};

export type ClassFeed = {
  feed_id: number;
  content: string;
  type: "announcement" | "assignment";
  creator: string;
  created_at: string;
};
