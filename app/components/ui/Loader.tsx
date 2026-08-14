import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Loader / Spinner Component
 * 
 * PURPOSE:
 * - Visual indicator of loading/processing state
 * - Used for page loads, data fetching, processing operations
 * - Provides multiple animation styles and sizes
 * - Ensures consistent loading experience across application
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Color: Brand blue (primary)
 * - Animation: 600ms linear rotation
 * - Sizes: 16px (sm), 24px (md), 32px (lg), 48px (xl)
 * - Stroke width: 2px-3px
 * - Background circle: Subtle gray
 */

const loaderVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      size: {
        // Small: 16px
        sm: "w-4 h-4",
        
        // Medium: 24px (default)
        md: "w-6 h-6",
        
        // Large: 32px
        lg: "w-8 h-8",
        
        // Extra Large: 48px
        xl: "w-12 h-12",
      },

      variant: {
        // Spinner: Rotating circle with gradient
        spinner: "",
        
        // Pulse: Opacity animation
        pulse: "",
        
        // Dots: Animated dots
        dots: "",
      },
    },

    defaultVariants: {
      size: "md",
      variant: "spinner",
    },
  }
);

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  /** Color of the loader */
  color?: string;
  
  /** Loading text */
  text?: string;
  
  /** Text position relative to loader */
  textPosition?: "right" | "bottom";
}

/**
 * Loader Component
 * 
 * API (Props):
 * - size: "sm" (16px) | "md" (24px) | "lg" (32px) | "xl" (48px) (default: "md")
 * - variant: "spinner" (rotating) | "pulse" (fading) | "dots" (animated dots)
 * - color: string (custom color, default: brand-blue)
 * - text: string (optional loading text)
 * - textPosition: "right" | "bottom" (where to show text)
 * 
 * SIZES:
 * - sm: 16px (inline, dense UI)
 * - md: 24px (standard)
 * - lg: 32px (prominent)
 * - xl: 48px (full-page loader)
 * 
 * VARIANTS:
 * - spinner: Rotating circle (classic loader)
 * - pulse: Opacity pulsing (subtle)
 * - dots: Animated dot sequence (playful)
 * 
 * STATES:
 * - Loading: Continuous animation
 * - With text: Shows "Loading..." or custom text beside/below
 * 
 * USE CASES:
 * - Inline loading: <Loader size="sm" />
 * - Button loading: <Loader size="md" text="Processing..." />
 * - Page loading: <Loader size="xl" text="Loading..." textPosition="bottom" />
 * - Skeleton alternative: <Loader variant="pulse" />
 * 
 * ANIMATION:
 * - Spinner: 600ms linear rotation (60 RPM)
 * - Pulse: 2s ease-in-out opacity
 * - Dots: 1.2s ease-in-out scale animation
 * 
 * ACCESSIBILITY:
 * - ARIA: role="status", aria-live="polite"
 * - Screen reader: Announces "Loading" state
 * - Not purely decorative (semantic purpose)
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      className,
      size = "md",
      variant = "spinner",
      color = "currentColor",
      text,
      textPosition = "right",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    };

    const strokeSize = {
      sm: "2",
      md: "2",
      lg: "3",
      xl: "3",
    };

    const containerClass = text
      ? textPosition === "right"
        ? "flex items-center gap-md"
        : "flex flex-col items-center gap-md"
      : "";

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={text || "Loading"}
        className={cn(containerClass, className)}
        {...props}
      >
        {/* Spinner Variant */}
        {variant === "spinner" && (
          <div className={cn("inline-flex items-center justify-center", sizeClasses[size || "md"])}>
            <svg
              className="animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circle */}
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth={strokeSize[size || "md"]}
                strokeOpacity="0.2"
              />
              {/* Animated circle */}
              <path
                fill="none"
                stroke={color}
                strokeWidth={strokeSize[size || "md"]}
                strokeLinecap="round"
                d="M 12 2 A 10 10 0 0 1 22 12"
              />
            </svg>
          </div>
        )}

        {/* Pulse Variant */}
        {variant === "pulse" && (
          <div
            className={cn(
              "rounded-full bg-current animate-pulse-subtle",
              sizeClasses[size || "md"]
            )}
            style={{ opacity: 0.5 }}
          />
        )}

        {/* Dots Variant */}
        {variant === "dots" && (
          <div className="flex gap-xs items-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-current animate-bounce",
                  {
                    "w-1.5 h-1.5 delay-[0ms]": size === "sm" || size === "md",
                    "w-2 h-2 delay-[0ms]": size === "lg",
                    "w-3 h-3 delay-[0ms]": size === "xl",
                  },
                  i === 1 && "delay-[100ms]",
                  i === 2 && "delay-[200ms]"
                )}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        )}

        {/* Loading Text */}
        {text && (
          <span className="text-sm font-medium text-gray-600">
            {text}
          </span>
        )}
      </div>
    );
  }
);

Loader.displayName = "Loader";

export { Loader, loaderVariants };
