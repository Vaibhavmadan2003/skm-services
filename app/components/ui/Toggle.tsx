import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Toggle / Switch Component
 * 
 * PURPOSE:
 * - Binary on/off control for boolean states
 * - Commonly used for enabling/disabling features, preferences, settings
 * - Provides clear visual feedback with smooth animated transitions
 * - Ensures accessibility with keyboard interaction and ARIA labels
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Colors: Brand blue (active), gray-300 (inactive)
 * - Padding: 2px (track padding for thumb)
 * - Border radius: full
 * - Transitions: 200ms ease-out
 * - States: default, hover, focus, active, disabled
 * - Sizes: sm (36px), md (44px), lg (56px)
 */

const toggleVariants = cva(
  "relative inline-flex items-center rounded-full transition-smooth focus-ring disabled:disabled-state",
  {
    variants: {
      size: {
        // Small: 36px width, 18px height
        sm: "h-5 w-9",
        
        // Medium: 44px width, 24px height (default)
        md: "h-6 w-11",
        
        // Large: 56px width, 32px height
        lg: "h-8 w-14",
      },

      checked: {
        true: "bg-brand-blue",
        false: "bg-gray-300",
      },

      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },

    defaultVariants: {
      size: "md",
      checked: false,
      disabled: false,
    },
  }
);

const thumbVariants = cva(
  "absolute rounded-full bg-white transition-smooth shadow-md",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-7 w-7",
      },

      checked: {
        true: {
          sm: "translate-x-4",
          md: "translate-x-5",
          lg: "translate-x-7",
        },
        false: {
          sm: "translate-x-0.5",
          md: "translate-x-0.5",
          lg: "translate-x-1",
        },
      },
    },

    compoundVariants: [
      {
        size: "sm",
        checked: true,
        class: "translate-x-4",
      },
      {
        size: "sm",
        checked: false,
        class: "translate-x-0.5",
      },
      {
        size: "md",
        checked: true,
        class: "translate-x-5",
      },
      {
        size: "md",
        checked: false,
        class: "translate-x-0.5",
      },
      {
        size: "lg",
        checked: true,
        class: "translate-x-7",
      },
      {
        size: "lg",
        checked: false,
        class: "translate-x-1",
      },
    ],

    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

export interface ToggleProps extends VariantProps<typeof toggleVariants> {
  /** Controlled checked state */
  checked?: boolean;
  
  /** Controlled change handler */
  onChange?: (checked: boolean) => void;
  
  /** Is field disabled */
  disabled?: boolean;
  
  /** Accessibility label */
  "aria-label"?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Label text */
  label?: string;
  
  /** Helper text below toggle */
  helperText?: string;
  
  /** Error state indicator */
  error?: boolean;
}

/**
 * Toggle Component
 * 
 * API (Props):
 * - checked: boolean (controlled state)
 * - onChange: (checked: boolean) => void
 * - disabled: boolean
 * - size: "sm" | "md" | "lg"
 * - label: string (displays beside toggle)
 * - helperText: string (displays below toggle)
 * - error: boolean (highlights in red)
 * - aria-label: string (for accessibility)
 * 
 * VARIANTS:
 * - size: sm (36px), md (44px), lg (56px)
 * - checked: true (brand-blue bg), false (gray-300 bg)
 * - disabled: true (opacity 50%, not interactive)
 * 
 * STATES:
 * - Default: Shows toggle in current state
 * - Hover: Slight opacity increase on thumb
 * - Focus: Blue ring with 2px offset
 * - Active: Smooth animation to opposite state
 * - Disabled: Reduced opacity, no interaction
 * 
 * ANIMATION:
 * - Thumb slides smoothly (200ms) to new position
 * - Background color transitions smoothly
 * - Subtle shadow maintains depth
 * 
 * ACCESSIBILITY:
 * - Keyboard: Space/Enter to toggle
 * - Focus: Visible ring outline
 * - ARIA label for screen readers
 * - Minimum 44px touch target (md size)
 */
const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { 
      size = "md", 
      checked = false, 
      onChange, 
      disabled = false,
      className,
      label,
      helperText,
      error,
      "aria-label": ariaLabel,
      ...props 
    },
    ref
  ) => {
    const handleToggle = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === " " || e.key === "Enter") && !disabled) {
        e.preventDefault();
        handleToggle();
      }
    };

    return (
      <div className="flex flex-col gap-md w-full">
        <div className="flex items-center gap-lg">
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel || (label ? `Toggle ${label}` : "Toggle switch")}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={cn(
              toggleVariants({ 
                size, 
                checked,
                disabled,
                className 
              }),
              error && "ring-2 ring-rose ring-offset-2"
            )}
            {...props}
          >
            {/* Thumb indicator */}
            <div
              className={cn(
                thumbVariants({ 
                  size, 
                  checked
                })
              )}
            />
          </button>

          {label && (
            <label className="text-sm font-medium text-gray-900 select-none cursor-pointer">
              {label}
            </label>
          )}
        </div>

        {helperText && (
          <p className={cn(
            "text-xs",
            error ? "text-rose font-medium" : "text-gray-600"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
