import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

/**
 * Radio Component
 * 
 * PURPOSE:
 * - Single-select from mutually exclusive options
 * - Accessible radio button with custom styling
 * - Supports group behavior
 */

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, label, error, size = "md", disabled, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const innerSizeClasses = {
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
    };

    return (
      <div className="flex items-center gap-md">
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          
          <div
            className={cn(
              "border-2 rounded-full transition-smooth flex items-center justify-center",
              sizeClasses[size],
              error
                ? "border-rose"
                : "border-gray-300 checked:border-brand-blue",
              disabled && "opacity-60 cursor-not-allowed",
              !disabled && "hover:border-gray-400 cursor-pointer"
            )}
          >
            {props.checked && (
              <div
                className={cn(
                  "rounded-full",
                  innerSizeClasses[size],
                  error ? "bg-rose" : "bg-brand-blue"
                )}
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

Radio.displayName = "Radio";

export { Radio };
