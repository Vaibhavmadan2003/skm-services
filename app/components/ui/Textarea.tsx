import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

/**
 * Textarea Component
 * 
 * PURPOSE:
 * - Multi-line text input for longer content
 * - Forms support for messages, descriptions, feedback
 * - Resizable and configurable height
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      errorMessage,
      helperText,
      label,
      required,
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-2 text-sm min-h-[80px]",
      md: "px-4 py-3 text-body min-h-[120px]",
      lg: "px-5 py-3.5 text-lg min-h-[160px]",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-md text-sm font-semibold text-gray-900">
            {label}
            {required && <span className="text-rose ml-xs">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full rounded-md border-2 transition-smooth focus-ring placeholder:text-gray-500 resize-vertical font-sans",
            sizeClasses[size],
            error
              ? "border-rose focus:border-rose focus:ring-rose/10"
              : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue/10",
            disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
            className
          )}
          {...props}
        />

        {error && errorMessage && (
          <p className="mt-xs text-xs font-medium text-rose">{errorMessage}</p>
        )}

        {!error && helperText && (
          <p className="mt-xs text-xs text-gray-600">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
