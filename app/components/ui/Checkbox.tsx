import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";
import { Check } from "lucide-react";

/**
 * Checkbox Component
 * 
 * PURPOSE:
 * - Boolean input for multi-select options
 * - Accessible checkbox with custom styling
 * - Supports group behavior
 */

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, error, size = "md", disabled, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const iconSizeClasses = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    return (
      <div className="flex items-center gap-md">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          
          <div
            className={cn(
              "border-2 rounded transition-smooth flex items-center justify-center",
              sizeClasses[size],
              error
                ? "border-rose bg-white checked:bg-rose"
                : "border-gray-300 bg-white checked:bg-brand-blue checked:border-brand-blue",
              disabled && "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed",
              !disabled && "hover:border-gray-400 cursor-pointer"
            )}
          >
            {props.checked && (
              <Check
                size={iconSizeClasses[size]}
                className="text-white"
              />
            )}
          </div>
        </div>

        {label && (
          <label className={cn(
            "text-sm font-medium cursor-pointer",
            disabled && "opacity-60 cursor-not-allowed"
          )}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
