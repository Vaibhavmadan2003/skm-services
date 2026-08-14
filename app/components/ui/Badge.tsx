import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Badge Component
 * 
 * PURPOSE:
 * - Small label or tag to categorize, highlight, or label content
 * - Used for status labels (Active, Pending, Completed), tags, category indicators
 * - Provides visual distinction through color and styling
 * - Ensures clear information hierarchy without being intrusive
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Colors: Brand blue, emerald, rose, amber, gray
 * - Padding: 4px 12px
 * - Border radius: 8px
 * - Font size: 12px, weight: 600
 * - Variants: solid (filled), outline (bordered), subtle (light background)
 */

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-md py-xs text-xs font-semibold transition-smooth",
  {
    variants: {
      variant: {
        // Solid variants - filled background
        "solid-primary": "bg-brand-blue text-white shadow-brand-sm",
        "solid-emerald": "bg-emerald text-white shadow-sm",
        "solid-rose": "bg-rose text-white shadow-sm",
        "solid-amber": "bg-amber text-white shadow-sm",
        "solid-gray": "bg-gray-200 text-gray-900 shadow-sm",

        // Outline variants - bordered
        "outline-primary": "border-2 border-brand-blue text-brand-blue bg-transparent",
        "outline-emerald": "border-2 border-emerald text-emerald bg-transparent",
        "outline-rose": "border-2 border-rose text-rose bg-transparent",
        "outline-amber": "border-2 border-amber text-amber bg-transparent",
        "outline-gray": "border-2 border-gray-300 text-gray-700 bg-transparent",

        // Subtle variants - light background
        "subtle-primary": "bg-brand-blue-light text-brand-blue",
        "subtle-emerald": "bg-green-100 text-emerald",
        "subtle-rose": "bg-red-100 text-rose",
        "subtle-amber": "bg-yellow-100 text-amber",
        "subtle-gray": "bg-gray-100 text-gray-700",
      },

      size: {
        // Small: 4px 8px, 12px font
        sm: "px-sm py-xs text-xs",
        
        // Medium: 4px 12px, 12px font (default)
        md: "px-md py-xs text-xs",
        
        // Large: 6px 16px, 14px font
        lg: "px-lg py-xs text-sm",
      },

      icon: {
        true: "gap-xs",
        false: "",
      },
    },

    defaultVariants: {
      variant: "solid-primary",
      size: "md",
      icon: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof badgeVariants>, 'icon'> {
  /** Badge content */
  children: React.ReactNode;
  
  /** Icon component (rendered before text) */
  icon?: React.ReactNode;
  
  /** Makes badge dismissible with close button */
  dismissible?: boolean;
  
  /** Handler for dismiss button click */
  onDismiss?: () => void;
  
  /** Accessibility label */
  "aria-label"?: string;
}

/**
 * Badge Component
 * 
 * API (Props):
 * - children: React node (badge content/text)
 * - variant: "solid-primary" | "solid-emerald" | "solid-rose" | "solid-amber" | "solid-gray"
 *            "outline-primary" | "outline-emerald" | "outline-rose" | "outline-amber" | "outline-gray"
 *            "subtle-primary" | "subtle-emerald" | "subtle-rose" | "subtle-amber" | "subtle-gray"
 * - size: "sm" | "md" | "lg"
 * - icon: React node (displays left of text)
 * - dismissible: boolean (shows close button)
 * - onDismiss: () => void (handler for close button)
 * 
 * VARIANTS (15 total):
 * - Solid: Filled background (brand-blue, emerald, rose, amber, gray)
 * - Outline: Bordered style (brand-blue, emerald, rose, amber, gray)
 * - Subtle: Light background (brand-blue, emerald, rose, amber, gray)
 * 
 * SIZES:
 * - sm: 8px 8px padding, 12px font
 * - md: 4px 12px padding, 12px font (default)
 * - lg: 6px 16px padding, 14px font
 * 
 * STATES:
 * - Default: Shows badge with specified variant
 * - With icon: Icon rendered left of text
 * - Dismissible: Close button (X) on right side
 * - Hover (dismissible): Slight opacity change on dismiss button
 * 
 * USE CASES:
 * - Status labels: <Badge variant="solid-emerald">Active</Badge>
 * - Tags: <Badge variant="outline-primary">Feature</Badge>
 * - Categories: <Badge variant="subtle-amber">In Progress</Badge>
 * - With icon: <Badge icon={<CheckCircle size={14} />}>Verified</Badge>
 * - Dismissible: <Badge dismissible onDismiss={handleDismiss}>Notification</Badge>
 * 
 * ACCESSIBILITY:
 * - Semantic HTML (div with span children)
 * - ARIA label for context
 * - Close button keyboard accessible (if dismissible)
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = "solid-primary",
      size = "md",
      children,
      icon,
      dismissible = false,
      onDismiss,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, icon: !!icon, className }),
          "w-fit"
        )}
        aria-label={ariaLabel}
        {...props}
      >
        {icon && <span className="flex items-center justify-center flex-shrink-0">{icon}</span>}
        <span>{children}</span>

        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-xs flex items-center justify-center opacity-75 hover:opacity-100 transition-smooth focus-ring rounded-sm"
            aria-label="Dismiss badge"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
