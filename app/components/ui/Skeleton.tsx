import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Skeleton Component
 * 
 * PURPOSE:
 * - Content placeholder while data is loading
 * - Provides visual indication of content structure
 * - Reduces perceived loading time through progressive rendering
 * - Common alternative to loaders for list/grid content
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Color: Gray background (#E5E7EB)
 * - Animation: Pulse/shimmer effect (2s ease-in-out)
 * - Border radius: Matches content it represents
 * - Opacity: 60%
 */

const skeletonVariants = cva(
  "bg-gray-200 animate-pulse-subtle rounded",
  {
    variants: {
      variant: {
        // Text: Single line of text
        text: "h-4 w-3/4",
        
        // Paragraph: Multiple lines of text
        paragraph: "space-y-md",
        
        // Avatar: Circular skeleton
        avatar: "rounded-full",
        
        // Image: Rectangular skeleton
        image: "aspect-video",
        
        // Card: Full card skeleton
        card: "rounded-lg p-xl",
        
        // Button: Button-sized skeleton
        button: "rounded-md h-10 w-24",
      },

      size: {
        sm: "h-3 w-full",
        md: "h-4 w-full",
        lg: "h-6 w-full",
      },
    },

    defaultVariants: {
      variant: "text",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Number of lines (for text variant) */
  lines?: number;
  
  /** Width of skeleton */
  width?: string;
  
  /** Height of skeleton */
  height?: string;
  
  /** Show shimmer animation */
  shimmer?: boolean;
  
  /** Custom shape */
  shape?: "rect" | "circle";
}

/**
 * Skeleton Component
 * 
 * API (Props):
 * - variant: "text" | "paragraph" | "avatar" | "image" | "card" | "button"
 * - size: "sm" | "md" | "lg" (for text lines)
 * - lines: number (for paragraph variant)
 * - width: string (CSS width)
 * - height: string (CSS height)
 * - shimmer: boolean (enable shimmer effect)
 * - shape: "rect" | "circle"
 * 
 * VARIANTS:
 * - text: Single line placeholder (4px height)
 * - paragraph: Multiple lines with spacing
 * - avatar: Circle placeholder
 * - image: Rectangular aspect-video placeholder
 * - card: Full card-sized skeleton
 * - button: Button-sized skeleton
 * 
 * SIZES:
 * - sm: 12px height
 * - md: 16px height (default)
 * - lg: 24px height
 * 
 * STATES:
 * - Loading: Pulsing animation (2s ease-in-out)
 * - Shimmer (optional): Gradient shimmer effect
 * 
 * USE CASES:
 * - Single line: <Skeleton />
 * - Multiple lines: <Skeleton variant="paragraph" lines={3} />
 * - Avatar: <Skeleton variant="avatar" size="lg" width="64px" height="64px" />
 * - Image: <Skeleton variant="image" />
 * - Card: <Skeleton variant="card" />
 * - List: <>{Array.from({length: 5}).map((_, i) => <Skeleton key={i} />)}</>
 * 
 * ANIMATION:
 * - Pulse: 2s ease-in-out opacity (60% to 100%)
 * - Shimmer (optional): Gradient animation left to right
 * 
 * ACCESSIBILITY:
 * - ARIA: role="status", aria-busy="true"
 * - Screen reader: Announces "Loading content"
 * - Not purely decorative (semantic purpose)
 * - Text content: "Content is loading"
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "text",
      size = "md",
      lines,
      width,
      height,
      shimmer = false,
      shape,
      ...props
    },
    ref
  ) => {
    // Paragraph variant with multiple lines
    if (variant === "paragraph" && lines) {
      return (
        <div className="space-y-md" {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? ref : undefined}
              className={cn(
                skeletonVariants({ variant: "text", size }),
                i === lines - 1 && "w-1/2",
                shimmer && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%] animate-shimmer",
                className
              )}
            />
          ))}
        </div>
      );
    }

    // Avatar variant
    if (variant === "avatar") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-full bg-gray-200 animate-pulse-subtle",
            width || "w-10",
            height || "h-10",
            shimmer && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%] animate-shimmer",
            className
          )}
          role="status"
          aria-busy="true"
          aria-label="Loading avatar"
          {...props}
        />
      );
    }

    // Image variant
    if (variant === "image") {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full bg-gray-200 animate-pulse-subtle rounded-md aspect-video",
            shimmer && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%] animate-shimmer",
            className
          )}
          role="status"
          aria-busy="true"
          aria-label="Loading image"
          {...props}
        />
      );
    }

    // Card variant
    if (variant === "card") {
      return (
        <div
          ref={ref}
          className={cn(
            "bg-gray-200 animate-pulse-subtle rounded-lg p-xl",
            shimmer && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%] animate-shimmer",
            className
          )}
          role="status"
          aria-busy="true"
          aria-label="Loading card"
          {...props}
        >
          <div className="space-y-md">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-full" />
            <div className="h-3 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      );
    }

    // Button variant
    if (variant === "button") {
      return (
        <div
          ref={ref}
          className={cn(
            "bg-gray-200 animate-pulse-subtle rounded-md h-10 w-24",
            shimmer && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%] animate-shimmer",
            className
          )}
          role="status"
          aria-busy="true"
          aria-label="Loading button"
          {...props}
        />
      );
    }

    // Default text variant
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, size }),
          width && width,
          height && height,
          shimmer && "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%] animate-shimmer",
          className
        )}
        role="status"
        aria-busy="true"
        aria-label="Loading content"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
