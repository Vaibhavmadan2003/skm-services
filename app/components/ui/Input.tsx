import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

/**
 * Input Component
 * 
 * PURPOSE:
 * - Primary text input element for form submissions
 * - Provides consistent input styling across the application
 * - Manages focus, error, and disabled states
 * - Ensures accessibility with proper ARIA attributes
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Background: White
 * - Border: 1px solid #D1D5DB (gray-300)
 * - Padding: 12px 16px
 * - Border radius: 8px
 * - Font: 16px (prevents zoom on iOS)
 * - Focus: Border blue + ring shadow
 * - States: default, focus, error, disabled
 */

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Error state indicator */
  error?: boolean;
  
  /** Error message to display */
  errorMessage?: string;
  
  /** Helper text below input */
  helperText?: string;
  
  /** Label for the input */
  label?: string;
  
  /** Is field required */
  required?: boolean;
  
  /** Size variant */
  size?: "sm" | "md" | "lg";
  
  /** Left icon/addon */
  leftAddon?: React.ReactNode;
  
  /** Right icon/addon */
  rightAddon?: React.ReactNode;
}

/**
 * Input Component
 * 
 * Variants:
 * - size: "sm" (10px 12px) | "md" (12px 16px) | "lg" (14px 18px)
 * - error: boolean (red border + ring)
 * - disabled: boolean (gray bg, gray text)
 * 
 * States:
 * - Default: gray-300 border
 * - Focus: brand-blue border + ring shadow
 * - Error: rose border + ring shadow
 * - Disabled: gray-100 bg, gray-500 text
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      error,
      errorMessage,
      helperText,
      label,
      required,
      size = "md",
      leftAddon,
      rightAddon,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-body",
      lg: "px-5 py-3.5 text-lg",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-md text-sm font-semibold text-gray-900">
            {label}
            {required && <span className="text-rose ml-xs">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-lg pointer-events-none text-gray-500">{leftAddon}</div>
          )}

          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              "w-full rounded-md border-2 transition-smooth focus-ring placeholder:text-gray-500",
              sizeClasses[size],
              leftAddon && "pl-12",
              rightAddon && "pr-12",
              error
                ? "border-rose focus:border-rose focus:ring-rose/10"
                : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue/10",
              disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
              className
            )}
            {...props}
          />

          {rightAddon && (
            <div className="absolute right-lg pointer-events-none text-gray-500">{rightAddon}</div>
          )}
        </div>

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

Input.displayName = "Input";

export { Input };
