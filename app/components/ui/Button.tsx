import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Button Component
 * 
 * PURPOSE:
 * - Primary interaction element for user actions
 * - Provides consistent button styling across all variants and states
 * - Ensures accessibility with proper focus states and disabled handling
 * - Supports loading state for async operations
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Colors: Brand blue, emerald, rose (semantic)
 * - Spacing: 12px 24px (standard), 16px 32px (large)
 * - Typography: 16px weight-600
 * - Border radius: 8px
 * - Transitions: 150ms ease-out
 * - States: default, hover, focus, active, disabled, loading
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-lg rounded-md font-semibold transition-smooth focus-ring disabled:disabled-state",
  {
    variants: {
      variant: {
        // Primary: Filled blue button
        primary: "bg-brand-blue text-white hover:bg-brand-blue-dark active:scale-98 shadow-sm hover:shadow-md",
        
        // Secondary: Outlined button
        secondary: "bg-gray-100 text-gray-900 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300 active:scale-98",
        
        // Tertiary: Text-only button
        tertiary: "text-brand-blue hover:bg-brand-blue-light active:text-brand-blue-dark",
        
        // Ghost: Transparent bordered button
        ghost: "text-brand-blue border-2 border-brand-blue hover:bg-brand-blue-light active:bg-blue-100",
        
        // Danger: Red button for destructive actions
        danger: "bg-rose text-white hover:bg-red-600 active:scale-98 shadow-sm hover:shadow-md",
        
        // Success: Green button for positive actions
        success: "bg-emerald text-white hover:bg-green-700 active:scale-98 shadow-sm hover:shadow-md",
      },

      size: {
        // Small: 10px 16px padding, 14px font
        sm: "px-4 py-2.5 text-sm",
        
        // Normal: 12px 24px padding, 16px font (default)
        md: "px-6 py-3 text-body",
        
        // Large: 16px 32px padding, 18px font
        lg: "px-8 py-4 text-lg",
        
        // Full width
        full: "w-full px-6 py-3 text-body",
      },

      isLoading: {
        true: "relative text-transparent",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      isLoading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  
  /** Left icon component */
  leftIcon?: React.ReactNode;
  
  /** Right icon component */
  rightIcon?: React.ReactNode;
  
  /** Button content */
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * API (Props):
 * - variant: "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "success"
 * - size: "sm" | "md" | "lg" | "full"
 * - isLoading: boolean (shows spinner, disables interaction)
 * - leftIcon: React node (rendered before text)
 * - rightIcon: React node (rendered after text)
 * - disabled: boolean
 * - All standard HTML button props
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, isLoading, className }))}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-5 w-5 animate-spin-slow text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        
        {!isLoading && (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
