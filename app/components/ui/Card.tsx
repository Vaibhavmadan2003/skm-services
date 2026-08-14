import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Card Component
 * 
 * PURPOSE:
 * - Container for grouping related content
 * - Provides consistent card styling, spacing, and visual hierarchy
 * - Used for service listings, testimonials, pricing tiers, feature showcases
 * - Ensures visual consistency and professional appearance
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Background: White
 * - Border: 1px solid #E5E7EB (gray-200)
 * - Border radius: 12px
 * - Shadow: md (0 4px 6px -1px rgba(0, 0, 0, 0.1))
 * - Hover: shadow-lg with slight translateY(-2px)
 * - Padding: 24px (standard), 32px (large)
 * - Transitions: 300ms ease-out
 * - States: default, hover, active
 */

const cardVariants = cva(
  "rounded-lg border border-gray-200 bg-white transition-smooth overflow-hidden",
  {
    variants: {
      variant: {
        // Default: Basic white card with subtle shadow
        default: "shadow-md hover:shadow-lg hover:-translate-y-0.5",
        
        // Elevated: Slightly more prominent shadow
        elevated: "shadow-lg hover:shadow-xl hover:-translate-y-1",
        
        // Outlined: Only border, no shadow
        outlined: "shadow-none hover:shadow-md hover:-translate-y-0.5",
        
        // Ghost: Minimal styling
        ghost: "border-transparent shadow-none hover:bg-gray-50",
        
        // Interactive: Highlighted on hover, suitable for clickable cards
        interactive: "shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:border-brand-blue cursor-pointer",
      },

      padding: {
        // None: No padding
        none: "p-0",
        
        // Small: 12px padding
        sm: "p-md",
        
        // Medium: 24px padding (default)
        md: "p-xl",
        
        // Large: 32px padding
        lg: "p-2xl",
      },

      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },

    defaultVariants: {
      variant: "default",
      padding: "md",
      disabled: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Card header content */
  header?: React.ReactNode;
  
  /** Card body content (main content) */
  children: React.ReactNode;
  
  /** Card footer content */
  footer?: React.ReactNode;
  
  /** Image at top of card */
  image?: React.ReactNode;
  
  /** Badge/tag to display in corner */
  badge?: React.ReactNode;
  
  /** Is card clickable */
  clickable?: boolean;
  
  /** Click handler if interactive */
  onClick?: () => void;
  
  /** Is card selected/active */
  selected?: boolean;
}

/**
 * Card Component
 * 
 * API (Props):
 * - children: React node (card body content) - required
 * - header: React node (optional header content)
 * - footer: React node (optional footer content)
 * - image: React node (optional image at top)
 * - badge: React node (optional badge overlay)
 * - variant: "default" | "elevated" | "outlined" | "ghost" | "interactive"
 * - padding: "none" | "sm" | "md" | "lg"
 * - clickable: boolean (makes cursor pointer)
 * - onClick: () => void (handler for click)
 * - selected: boolean (highlights selected state)
 * - disabled: boolean (reduces opacity, disables interaction)
 * 
 * VARIANTS:
 * - default: White card with subtle shadow (most common)
 * - elevated: More prominent shadow for emphasis
 * - outlined: Only border, no shadow
 * - ghost: Minimal styling, light hover effect
 * - interactive: Enhanced hover effect for clickable cards
 * 
 * PADDING:
 * - none: No padding (0px)
 * - sm: Small padding (12px)
 * - md: Medium padding (24px) - default
 * - lg: Large padding (32px)
 * 
 * STATES:
 * - Default: Shows card with specified variant
 * - Hover: Shadow increases, slight upward translation (-2px to -4px)
 * - Selected: Optional border highlight or background change
 * - Disabled: Reduced opacity (50%), no interaction
 * 
 * COMPOSITION:
 * - Image: Full-width at top (no padding)
 * - Badge: Positioned in top-right corner
 * - Header: Optional section above body
 * - Body: Main content area
 * - Footer: Optional section below body
 * 
 * USE CASES:
 * - Service listings: <Card variant="interactive">Service content</Card>
 * - Testimonials: <Card>Quote and author</Card>
 * - Pricing tiers: <Card variant="elevated">Pricing details</Card>
 * - Feature showcases: <Card image={img}>Feature description</Card>
 * 
 * ACCESSIBILITY:
 * - Semantic HTML (div)
 * - Proper heading hierarchy within card
 * - If interactive, ensure keyboard accessible
 * - ARIA roles for clickable cards (optional)
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      disabled = false,
      header,
      children,
      footer,
      image,
      badge,
      clickable = false,
      onClick,
      selected = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding: image ? "none" : padding, disabled, className }),
          clickable && "cursor-pointer",
          selected && "ring-2 ring-brand-blue ring-offset-2"
        )}
        onClick={onClick}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {/* Image Section */}
        {image && (
          <div className="relative w-full overflow-hidden bg-gray-100">
            {image}
            {badge && (
              <div className="absolute top-lg right-lg z-10">
                {badge}
              </div>
            )}
          </div>
        )}

        {/* Badge (if no image) */}
        {badge && !image && (
          <div className="absolute top-lg right-lg z-10">
            {badge}
          </div>
        )}

        {/* Header Section */}
        {header && (
          <div className={cn(
            "border-b border-gray-200",
            padding === "none" ? "px-xl py-lg" : ""
          )}>
            {header}
          </div>
        )}

        {/* Body Section */}
        <div className={cn(
          image && padding !== "none" && "p-xl"
        )}>
          {children}
        </div>

        {/* Footer Section */}
        {footer && (
          <div className={cn(
            "border-t border-gray-200",
            padding === "none" ? "px-xl py-lg" : "px-xl py-lg"
          )}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
