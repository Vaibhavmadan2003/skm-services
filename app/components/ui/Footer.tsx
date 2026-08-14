import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Footer Component
 * 
 * PURPOSE:
 * - Bottom section of page with additional links, information, legal
 * - Provides consistent footer styling and organization
 * - Supports multiple column layout with flexible content
 * - Includes copyright, contact info, social links
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Background: Dark gray (#1F2937) or light gray
 * - Text: White (dark bg) or dark gray (light bg)
 * - Padding: 48px 24px 24px
 * - Column layout: 2-4 columns (responsive)
 * - Divider: 1px solid border
 */

const footerVariants = cva(
  "w-full transition-smooth",
  {
    variants: {
      variant: {
        // Dark: Dark gray background with white text
        dark: "bg-gray-900 text-white",
        
        // Light: Light gray background with dark text
        light: "bg-gray-50 text-gray-900",
        
        // Bordered: Light background with top border
        bordered: "bg-white text-gray-900 border-t border-gray-200",
      },

      padding: {
        // Compact: Minimal spacing
        compact: "px-lg py-2xl",
        
        // Standard: Default spacing
        standard: "px-xl py-3xl md:px-2xl md:py-4xl",
        
        // Generous: Extra spacious
        generous: "px-2xl py-4xl md:px-3xl md:py-5xl",
      },
    },

    defaultVariants: {
      variant: "dark",
      padding: "standard",
    },
  }
);

export interface FooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {
  /** Footer branding/logo section */
  brand?: React.ReactNode;
  
  /** Footer column sections */
  columns?: React.ReactNode;
  
  /** Bottom section: copyright, links, etc. */
  bottom?: React.ReactNode;
  
  /** Show top divider */
  showDivider?: boolean;
  
  /** Max width override */
  maxWidth?: string;
}

/**
 * Footer Component
 * 
 * API (Props):
 * - brand: React node (logo, company info)
 * - columns: React node (navigation columns)
 * - bottom: React node (copyright, bottom links)
 * - variant: "dark" | "light" | "bordered" (default: "dark")
 * - padding: "compact" | "standard" | "generous" (default: "standard")
 * - showDivider: boolean (top border)
 * - maxWidth: string (CSS max-width)
 * 
 * VARIANTS:
 * - dark: Dark gray background (#1F2937) with white text (most common)
 * - light: Light gray background (#F9FAFB) with dark text
 * - bordered: White background with top border
 * 
 * PADDING:
 * - compact: 16px horizontal, 32px vertical
 * - standard: 24px horizontal, 48px vertical (responsive)
 * - generous: 32px horizontal, 64px vertical (responsive)
 * 
 * LAYOUT STRUCTURE:
 * 1. Brand section (optional)
 *    - Logo
 *    - Company description
 *    - Social links
 * 
 * 2. Column sections
 *    - 2-4 columns (responsive)
 *    - Links organized by category
 *    - Headers (bold text)
 * 
 * 3. Bottom section
 *    - Copyright
 *    - Legal links (Privacy, Terms, etc.)
 *    - Additional info
 * 
 * USE CASES:
 * - Dark footer: <Footer variant="dark">Footer content</Footer>
 * - Light footer: <Footer variant="light">Footer content</Footer>
 * - With divider: <Footer showDivider>Footer content</Footer>
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Single column, stacked layout
 * - Tablet: 2 columns
 * - Desktop: 3-4 columns
 * - Padding increases with screen size
 * 
 * ACCESSIBILITY:
 * - Semantic HTML (<footer>)
 * - Proper heading hierarchy
 * - Keyboard navigation
 * - Focus management
 * - Link relationships clear
 * 
 * TYPICAL STRUCTURE:
 * <Footer brand={<BrandSection />} columns={<NavColumns />} bottom={<CopyrightSection />} />
 * 
 * EXAMPLE BRAND SECTION:
 * - Logo
 * - Company tagline
 * - Social icons
 * 
 * EXAMPLE COLUMNS:
 * - Product (Links)
 * - Company (Links)
 * - Legal (Links)
 * - Support (Links)
 * 
 * EXAMPLE BOTTOM:
 * - © 2024 Company Name
 * - Privacy | Terms | Cookies
 */
const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  (
    {
      className,
      variant = "dark",
      padding = "standard",
      brand,
      columns,
      bottom,
      showDivider = false,
      maxWidth = "1280px",
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(
          footerVariants({ variant, padding, className }),
          showDivider && "border-t border-opacity-10"
        )}
        {...props}
      >
        {/* Main content */}
        <div className="mx-auto px-lg md:px-2xl" style={{ maxWidth }}>
          {/* Brand Section */}
          {brand && (
            <div className="mb-3xl pb-3xl border-b border-current border-opacity-10">
              {brand}
            </div>
          )}

          {/* Columns Section */}
          {columns && (
            <div className="mb-3xl pb-3xl border-b border-current border-opacity-10">
              {columns}
            </div>
          )}

          {/* Bottom Section */}
          {bottom && (
            <div className="pt-lg">
              {bottom}
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

// Helper components for common footer patterns

export interface FooterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column title/heading */
  title: string;
  
  /** Column content (typically links) */
  children: React.ReactNode;
}

/**
 * FooterColumn - Helper component for organizing footer columns
 */
const FooterColumn = React.forwardRef<HTMLDivElement, FooterColumnProps>(
  (
    { title, children, className, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("mb-xl md:mb-0", className)} {...props}>
        <h3 className="font-semibold text-sm mb-md opacity-90">
          {title}
        </h3>
        <div className="space-y-xs text-sm opacity-75">
          {children}
        </div>
      </div>
    );
  }
);

FooterColumn.displayName = "FooterColumn";

export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link text */
  children: React.ReactNode;
}

/**
 * FooterLink - Helper component for footer links
 */
const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  (
    { className, children, ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        className={cn(
          "block hover:opacity-100 transition-smooth opacity-75 focus-ring rounded-sm",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

FooterLink.displayName = "FooterLink";

export interface FooterDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color of divider */
  color?: string;
}

/**
 * FooterDivider - Helper component for separating footer sections
 */
const FooterDivider = React.forwardRef<HTMLDivElement, FooterDividerProps>(
  (
    { className, color = "opacity-10", ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-t border-current",
          color,
          className
        )}
        {...props}
      />
    );
  }
);

FooterDivider.displayName = "FooterDivider";

export { Footer, footerVariants, FooterColumn, FooterLink, FooterDivider };
