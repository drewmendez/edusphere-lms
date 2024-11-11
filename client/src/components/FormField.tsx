import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <Label>{label} *</Label>
        <Input
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

export default FormField;
