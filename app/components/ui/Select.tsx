import React, { forwardRef, useState } from "react";
import { cn } from "@/app/lib/utils";
import { ChevronDown } from "lucide-react";

/**
 * Select / Dropdown Component
 * 
 * PURPOSE:
 * - Provides dropdown selection interface
 * - Handles multiple options in a clean format
 * - Manages open/close state
 * - Accessible keyboard navigation
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Same styling as Input
 * - Chevron icon right-aligned
 * - Focus: brand-blue border + ring
 * - Open state: expanded dropdown list
 * - States: default, open, focus, disabled, error
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "size"> {
  /** Options to display */
  options: SelectOption[];
  
  /** Error state */
  error?: boolean;
  
  /** Error message */
  errorMessage?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Label */
  label?: string;
  
  /** Is required */
  required?: boolean;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Size variant */
  size?: "sm" | "md" | "lg";
  
  /** Callback on value change */
  onChange?: (value: string) => void;
}

/**
 * Select Component
 * 
 * Variants:
 * - size: "sm" | "md" | "lg"
 * - error: boolean (red border)
 * - disabled: boolean (gray bg)
 * 
 * States:
 * - Default: gray border
 * - Focus: brand-blue border + ring
 * - Error: rose border + ring
 * - Disabled: gray bg
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      error,
      errorMessage,
      helperText,
      label,
      required,
      placeholder,
      size = "md",
      disabled,
      onChange,
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

        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              "w-full appearance-none rounded-md border-2 pr-10 transition-smooth focus-ring",
              sizeClasses[size],
              error
                ? "border-rose focus:border-rose focus:ring-rose/10"
                : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue/10",
              disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-lg top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
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

Select.displayName = "Select";

export { Select };
