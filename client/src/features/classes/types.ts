import { z } from "zod";

export const ClassFormSchema = z.object({
  class_subject: z.string().trim().min(1, "This field is required"),
  class_section: z.string().trim().min(1, "This field is required"),
});
export type ClassForm = z.infer<typeof ClassFormSchema>;
export type ClassData = ClassForm & {
  class_id: number;
};

export const EnrollmentFormSchema = z.object({
  class_code: z.string().trim().min(6, "Class codes are 6 characters long"),
});
export type EnrollmentForm = z.infer<typeof EnrollmentFormSchema>;

export type Class = {
  class_id: number;
  class_subject: string;
  class_code?: string;
  banner_color: string;
  class_section: string;
  class_teacher?: string;
};
