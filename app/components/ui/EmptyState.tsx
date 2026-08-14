import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { InboxIcon } from "lucide-react";

/**
 * EmptyState Component
 * 
 * PURPOSE:
 * - Display when no content/data is available
 * - Provides clear guidance to user on next steps
 * - Common states: no results, no data, no notifications
 * - Ensures positive UX when lists/grids are empty
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Padding: 48px 24px
 * - Icon size: 48px (gray)
 * - Text: Gray color, centered alignment
 * - Optional CTA button
 * - Background: Optional light gray
 */

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center py-3xl px-xl rounded-lg",
  {
    variants: {
      variant: {
        // Default: Light background
        default: "bg-gray-50",
        
        // Minimal: No background
        minimal: "bg-transparent",
        
        // Outlined: Dashed border
        outlined: "border-2 border-dashed border-gray-200 bg-transparent",
      },

      size: {
        // Small: Compact empty state
        sm: "py-2xl px-lg",
        
        // Medium: Standard empty state
        md: "py-3xl px-xl",
        
        // Large: Full-height empty state
        lg: "py-4xl px-2xl min-h-[300px]",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Icon to display */
  icon?: React.ReactNode;
  
  /** Title text */
  title?: string;
  
  /** Description text */
  description?: string;
  
  /** Action button */
  action?: React.ReactNode;
}

/**
 * EmptyState Component
 * 
 * API (Props):
 * - icon: React node (icon to display, default: InboxIcon)
 * - title: string (main title, e.g., "No results found")
 * - description: string (optional description)
 * - action: React node (optional CTA button)
 * - variant: "default" | "minimal" | "outlined" (default: "default")
 * - size: "sm" | "md" | "lg" (default: "md")
 * 
 * VARIANTS:
 * - default: Light gray background
 * - minimal: No background (transparent)
 * - outlined: Dashed border with transparent background
 * 
 * SIZES:
 * - sm: Compact (56px vertical padding)
 * - md: Standard (48px vertical padding) - default
 * - lg: Full-height (64px vertical padding, 300px min-height)
 * 
 * STATES:
 * - Display icon, title, description, optional action
 * - Centered alignment
 * - Consistent spacing and typography
 * 
 * USE CASES:
 * - No results: <EmptyState title="No services found" />
 * - No data: <EmptyState title="No bookings" description="Create your first booking" action={<Button>Create</Button>} />
 * - Search: <EmptyState title="No matches" description="Try different keywords" />
 * - Error: <EmptyState title="Unable to load" action={<Button>Retry</Button>} />
 * 
 * ICON USAGE:
 * - Default: InboxIcon (generic empty state)
 * - Custom: Pass specific icon (SearchIcon, DocumentIcon, etc.)
 * - No icon: Pass icon={null}
 * 
 * ACCESSIBILITY:
 * - Semantic HTML
 * - Title as heading (h3)
 * - Description as paragraph
 * - Action button: Clear purpose
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      icon,
      title = "No content available",
      description,
      action,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          emptyStateVariants({ variant, size, className })
        )}
        {...props}
      >
        {/* Icon */}
        {icon !== null && (
          <div className="mb-lg text-gray-400">
            {icon || <InboxIcon size={48} />}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-h5 font-semibold text-gray-900 mb-sm text-center">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-body text-gray-600 mb-xl text-center max-w-sm">
            {description}
          </p>
        )}

        {/* Action */}
        {action && (
          <div className="mt-xl">
            {action}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState, emptyStateVariants };
