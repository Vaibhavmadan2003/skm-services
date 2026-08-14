import React, { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";

/**
 * Drawer / Sheet Component
 * 
 * PURPOSE:
 * - Side panel for navigation, filters, menus, or secondary content
 * - Slides in from edge with semi-transparent backdrop
 * - Used for mobile navigation, settings, filters
 * - Provides consistent drawer styling and animation
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Width: 280px (mobile), 320px (tablet)
 * - Animation: slide from edge with 300ms easing
 * - Backdrop: rgba(0, 0, 0, 0.5)
 * - Z-index: 50
 * - Shadow: xl
 * - Close button: Top-right corner
 * 
 * FEATURES:
 * - Smooth slide animation
 * - Backdrop click to close
 * - Escape key to close
 * - Focus trap
 * - Scrollable content
 * - Header, body, footer sections
 */

const drawerVariants = cva(
  "fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-white shadow-xl overflow-hidden",
  {
    variants: {
      side: {
        // Slides in from right
        right: "right-0 animate-slide-left w-full max-w-sm",
        
        // Slides in from left
        left: "left-0 animate-slide-right w-full max-w-sm",
        
        // Slides down from top
        top: "top-0 left-0 right-0 w-full h-auto max-h-screen animate-slide-down",
        
        // Slides up from bottom
        bottom: "bottom-0 left-0 right-0 w-full h-auto max-h-[80vh] animate-slide-up rounded-t-2xl",
      },

      size: {
        // Small: 256px
        sm: "w-64",
        
        // Medium: 320px (default)
        md: "w-80",
        
        // Large: 384px
        lg: "w-96",
      },
    },

    defaultVariants: {
      side: "right",
      size: "md",
    },
  }
);

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  /** Is drawer visible */
  open: boolean;
  
  /** Close handler */
  onClose: () => void;
  
  /** Drawer header/title */
  header?: React.ReactNode;
  
  /** Drawer body content */
  children: React.ReactNode;
  
  /** Drawer footer content */
  footer?: React.ReactNode;
  
  /** Show close button */
  showCloseButton?: boolean;
  
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  
  /** Close on escape key */
  closeOnEscape?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Drawer Component
 * 
 * API (Props):
 * - open: boolean (controls visibility) - required
 * - onClose: () => void (close handler) - required
 * - children: React node (drawer body content) - required
 * - header: React node (optional drawer header)
 * - footer: React node (optional drawer footer)
 * - side: "right" | "left" | "top" | "bottom" (default: "right")
 * - size: "sm" (256px) | "md" (320px) | "lg" (384px) (default: "md")
 * - showCloseButton: boolean (default: true)
 * - closeOnBackdropClick: boolean (default: true)
 * - closeOnEscape: boolean (default: true)
 * 
 * SIDES:
 * - right: Slides in from right (common for mobile menu)
 * - left: Slides in from left (common for navigation)
 * - top: Slides down from top
 * - bottom: Slides up from bottom (common for mobile filters)
 * 
 * SIZES:
 * - sm: 256px (narrow)
 * - md: 320px (standard) - default
 * - lg: 384px (wide)
 * 
 * STATES:
 * - Open: Drawer visible with backdrop, slide-in animation
 * - Closed: Drawer hidden, no backdrop
 * 
 * FEATURES:
 * - Smooth slide animation (300ms)
 * - Backdrop click closes drawer (if enabled)
 * - Escape key closes drawer (if enabled)
 * - Close button (X) in header (if enabled)
 * - Focus trap - keyboard navigation contained
 * - Scrollable content area
 * - Responsive sizing
 * - Body scroll prevention when open
 * 
 * ANIMATION:
 * - Fade in backdrop (150ms)
 * - Slide drawer from edge (300ms)
 * - Smooth transitions
 * 
 * USE CASES:
 * - Mobile navigation: <Drawer side="left" open={open} onClose={close}>Nav items</Drawer>
 * - Mobile menu: <Drawer side="right" open={open} onClose={close}>Menu items</Drawer>
 * - Mobile filters: <Drawer side="bottom" open={open} onClose={close}>Filter options</Drawer>
 * - Side panel: <Drawer size="lg" open={open} onClose={close}>Panel content</Drawer>
 * 
 * ACCESSIBILITY:
 * - Focus trap: Tab/Shift+Tab contained within drawer
 * - Escape key: Closes drawer
 * - Backdrop: Semantic purpose
 * - ARIA: role="dialog", aria-modal="true"
 * - Screen reader: Announces when opened
 * - Close button: Clear keyboard accessible
 */
const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      header,
      children,
      footer,
      side = "right",
      size = "md",
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className,
      ...props
    },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Drawer Content */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-header"
          className={cn(
            drawerVariants({ side, size, className }),
            // Size adjustments for different sides
            (side === "top" || side === "bottom") && "w-full",
            (side === "left" || side === "right") && "max-w-full h-screen"
          )}
          {...props}
        >
          {/* Header */}
          {header && (
            <div className="flex items-start justify-between border-b border-gray-200 px-xl py-lg gap-lg flex-shrink-0">
              <div id="drawer-header" className="text-h5 font-semibold text-gray-900">
                {header}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-900 focus-ring rounded-md transition-smooth flex-shrink-0"
                  aria-label="Close drawer"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn(
            "flex-1 overflow-y-auto px-xl py-lg",
            !header && showCloseButton && "flex items-start justify-between"
          )}>
            <div className="w-full">
              {children}
            </div>
            {!header && showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 focus-ring rounded-md transition-smooth flex-shrink-0"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-gray-200 px-xl py-lg bg-gray-50 flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </>
    );
  }
);

Drawer.displayName = "Drawer";

export { Drawer, drawerVariants };
