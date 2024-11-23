import React from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <Label>{label}</Label>
        <Textarea
          className={cn(error && "border-red-600 focus-visible:ring-0")}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 pl-1 text-xs italic text-red-600">{error}</p>
        )}
      </div>
    );
  },
);

export default TextareaField;
