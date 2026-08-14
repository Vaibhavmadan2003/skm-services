import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * SectionWrapper Component
 * 
 * PURPOSE:
 * - Consistent container for homepage sections
 * - Provides standardized padding, max-width, and spacing
 * - Ensures visual consistency across all sections
 * - Handles responsive behavior (mobile-first)
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Max width: 1280px
 * - Horizontal padding: 24px (mobile), 48px (desktop)
 * - Vertical padding: 48px (mobile), 96px (desktop)
 * - Background: White, light gray, or brand color
 * - Transitions: Smooth animations
 */

const sectionWrapperVariants = cva(
  "w-full transition-smooth",
  {
    variants: {
      variant: {
        // White: Standard white background
        white: "bg-white",
        
        // Light gray: Subtle background distinction
        light: "bg-gray-50",
        
        // Brand: Subtle brand blue background
        brand: "bg-brand-blue-light",
        
        // Gradient: Subtle gradient background
        gradient: "bg-gradient-to-b from-white to-gray-50",
        
        // Transparent: No background
        transparent: "bg-transparent",
      },

      padding: {
        // None: No padding
        none: "px-0 py-0",
        
        // Compact: Tight spacing
        compact: "px-lg py-2xl",
        
        // Standard: Default spacing
        standard: "px-xl py-3xl md:px-2xl md:py-4xl",
        
        // Generous: Extra spacious
        generous: "px-2xl py-4xl md:px-3xl md:py-5xl",
        
        // Hero: Full-screen height
        hero: "px-xl py-5xl md:px-2xl md:py-6xl min-h-screen flex items-center",
      },

      border: {
        // None: No border
        none: "",
        
        // Top: Top border only
        top: "border-t border-gray-200",
        
        // Bottom: Bottom border only
        bottom: "border-b border-gray-200",
        
        // Both: Top and bottom borders
        both: "border-t border-b border-gray-200",
      },
    },

    defaultVariants: {
      variant: "white",
      padding: "standard",
      border: "none",
    },
  }
);

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionWrapperVariants> {
  /** Section content */
  children: React.ReactNode;
  
  /** Semantic section tag */
  asSection?: boolean;
  
  /** Max width override */
  maxWidth?: string;
}

/**
 * SectionWrapper Component
 * 
 * API (Props):
 * - children: React node (section content) - required
 * - variant: "white" | "light" | "brand" | "gradient" | "transparent" (default: "white")
 * - padding: "none" | "compact" | "standard" | "generous" | "hero" (default: "standard")
 * - border: "none" | "top" | "bottom" | "both" (default: "none")
 * - asSection: boolean (render as <section> instead of <div>)
 * - maxWidth: string (CSS max-width override)
 * 
 * VARIANTS:
 * - white: Standard white background (most sections)
 * - light: Light gray (#F9FAFB) for alternating sections
 * - brand: Subtle brand blue (#F0F6FF) for accent sections
 * - gradient: White to gray gradient (smooth transition)
 * - transparent: No background
 * 
 * PADDING:
 * - none: No padding (0px)
 * - compact: Tight spacing (16px horizontal, 32px vertical)
 * - standard: Default spacing (24px → 32px horizontal, 48px → 64px vertical)
 * - generous: Extra spacious (32px → 48px horizontal, 64px → 80px vertical)
 * - hero: Full-screen height with centered content (mobile-responsive)
 * 
 * BORDERS:
 * - none: No border
 * - top: Light gray border on top
 * - bottom: Light gray border on bottom
 * - both: Borders on both edges
 * 
 * STATES:
 * - Default: Shows section with specified background and padding
 * - Responsive: Padding and max-width adjust for screen size
 * 
 * USE CASES:
 * - Standard section: <SectionWrapper>Content</SectionWrapper>
 * - Alternating sections: <SectionWrapper variant="light">Content</SectionWrapper>
 * - Hero section: <SectionWrapper variant="white" padding="hero">Hero content</SectionWrapper>
 * - With border: <SectionWrapper border="bottom">Content</SectionWrapper>
 * - Semantic: <SectionWrapper asSection>Content</SectionWrapper>
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: 24px horizontal padding, 48px vertical padding
 * - Tablet: 32px horizontal padding, 64px vertical padding
 * - Desktop: 32px-48px horizontal padding, 64px-80px vertical padding
 * - Max width: Always 1280px (centered with auto margins)
 * 
 * ACCESSIBILITY:
 * - Semantic <section> tag (if asSection={true})
 * - Proper heading hierarchy within section
 * - Focus management for interactive elements
 */
const SectionWrapper = React.forwardRef<HTMLDivElement, SectionWrapperProps>(
  (
    {
      className,
      variant = "white",
      padding = "standard",
      border = "none",
      children,
      asSection = false,
      maxWidth = "1280px",
      ...props
    },
    ref
  ) => {
    const Component = asSection ? "section" : "div";

    return (
      <Component
        ref={ref as any}
        className={cn(
          sectionWrapperVariants({ variant, padding, border, className }),
          "mx-auto px-lg md:px-2xl"
        )}
        style={{ maxWidth }}
        {...props}
      >
        {/* Inner container for content alignment */}
        <div className="w-full max-w-full">
          {children}
        </div>
      </Component>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper, sectionWrapperVariants };
