import { z } from "zod";

export const AssignmentFormSchema = z.object({
  title: z.string().trim().min(1, "This field is required"),
  description: z.string().trim().min(1, "This field is required"),
  points: z.number({ invalid_type_error: "This field is required" }).min(1),
});
export type AssignmentForm = z.infer<typeof AssignmentFormSchema>;
export type AssignmentData = AssignmentForm & {
  class_id: number;
};

export type SubmissionData = {
  assignment_id: number;
  answer: string;
};

export type Assignment = {
  assignment_id: number;
  title: string;
  description: string;
  points: number;
  created_at: string;
  creator: string;
  class_id?: number;
  class_subject?: string;
  class_section?: string;
  banner_color?: string;
  submitted_at?: string | null;
  given_points?: number | null;
};

export type Submission = {
  assignment_completion_id?: number;
  user_id?: number;
  student_name?: string;
  answer: string | null;
  submitted_at: string | null;
  points: number;
  given_points: number | null;
};

export type AssignmentSubmissionData = {
  marked: number;
  handedIn: number;
  assigned: number;
};
