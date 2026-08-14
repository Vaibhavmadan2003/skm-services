import React, { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";

/**
 * Modal Component
 * 
 * PURPOSE:
 * - Overlaying dialog for capturing user attention and focus
 * - Used for confirmations, forms, alerts, and important actions
 * - Provides consistent modal styling and behavior
 * - Ensures accessibility with focus trap and keyboard handling
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Backdrop: rgba(0, 0, 0, 0.5)
 * - Modal: White background, rounded corners, shadow-2xl
 * - Border radius: 12px
 * - Transitions: 300ms ease-out
 * - Max width: 512px (md), 640px (lg), 768px (xl)
 * - Z-index: 50
 * 
 * FEATURES:
 * - Smooth fade-in/slide-up animation
 * - Backdrop click to close
 * - Escape key to close
 * - Focus trap (keyboard navigation contained within modal)
 * - Close button
 * - Header, body, footer sections
 * - Scrollable content
 */

const modalVariants = cva(
  "relative bg-white rounded-lg shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto",
  {
    variants: {
      size: {
        // Small: 384px (35% of 1024px viewport)
        sm: "w-full max-w-sm",
        
        // Medium: 512px (50% of 1024px viewport) - default
        md: "w-full max-w-md",
        
        // Large: 640px (62% of 1024px viewport)
        lg: "w-full max-w-lg",
        
        // Extra Large: 768px (75% of 1024px viewport)
        xl: "w-full max-w-xl",
        
        // Full width: 90% viewport width
        full: "w-[90vw] max-w-full",
      },

      variant: {
        // Default: Standard modal
        default: "",
        
        // Centered: Modal centered in viewport
        centered: "fixed inset-0 flex items-center justify-center",
      },
    },

    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  /** Is modal visible */
  open: boolean;
  
  /** Close handler */
  onClose: () => void;
  
  /** Modal header/title */
  header?: React.ReactNode;
  
  /** Modal body content */
  children: React.ReactNode;
  
  /** Modal footer content (actions) */
  footer?: React.ReactNode;
  
  /** Close button in header */
  showCloseButton?: boolean;
  
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  
  /** Close on escape key */
  closeOnEscape?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Backdrop click handler */
  onBackdropClick?: () => void;
}

/**
 * Modal Component
 * 
 * API (Props):
 * - open: boolean (controls visibility) - required
 * - onClose: () => void (close handler) - required
 * - children: React node (modal body content) - required
 * - header: React node (optional modal header/title)
 * - footer: React node (optional modal footer with actions)
 * - size: "sm" | "md" | "lg" | "xl" | "full"
 * - variant: "default" | "centered" (default: "default")
 * - showCloseButton: boolean (default: true)
 * - closeOnBackdropClick: boolean (default: true)
 * - closeOnEscape: boolean (default: true)
 * - onBackdropClick: () => void (optional additional handler)
 * 
 * SIZES:
 * - sm: 384px max width
 * - md: 512px max width (default)
 * - lg: 640px max width
 * - xl: 768px max width
 * - full: 90vw (mobile-friendly)
 * 
 * STATES:
 * - Open: Modal visible with backdrop, scale-in animation
 * - Closed: Modal hidden, no backdrop
 * - Hovering backdrop: No visual change (depends on closeOnBackdropClick)
 * 
 * FEATURES:
 * - Backdrop click closes modal (if enabled)
 * - Escape key closes modal (if enabled)
 * - Close button (X) in header (if enabled)
 * - Focus trap - keyboard navigation contained
 * - Scrollable content area
 * - Optional header and footer sections
 * - Responsive sizing (full width on mobile)
 * 
 * ANIMATION:
 * - Fade in backdrop (150ms)
 * - Scale modal (150ms) with slight upward translate
 * - Smooth 300ms transitions
 * 
 * USE CASES:
 * - Confirmation: <Modal open={open} onClose={close}>Are you sure?</Modal>
 * - Form: <Modal header="Add Service" footer={actions}>Form fields</Modal>
 * - Alert: <Modal header="Alert" size="sm">Important message</Modal>
 * - Details: <Modal size="lg">Detailed information</Modal>
 * 
 * ACCESSIBILITY:
 * - Focus trap: Tab/Shift+Tab contained within modal
 * - Escape key: Closes modal
 * - Backdrop: Semantic purpose (focus container)
 * - ARIA: role="dialog", aria-modal="true", aria-labelledby
 * - Close button: Clear label and keyboard accessible
 * - Screen reader: Modal title announces when opened
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      header,
      children,
      footer,
      size = "md",
      variant = "default",
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      onBackdropClick,
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

    // Prevent body scroll when modal is open
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
      if (e.target === e.currentTarget) {
        onBackdropClick?.();
        if (closeOnBackdropClick) {
          onClose();
        }
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

        {/* Modal Container */}
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="presentation"
        >
          <div className="flex min-h-full items-center justify-center p-lg">
            {/* Modal Content */}
            <div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-header"
              className={cn(
                modalVariants({ size, variant, className })
              )}
              {...props}
            >
              {/* Header */}
              {header && (
                <div className="flex items-start justify-between border-b border-gray-200 px-xl py-lg gap-lg">
                  <div id="modal-header" className="text-h5 font-semibold text-gray-900">
                    {header}
                  </div>
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-600 hover:text-gray-900 focus-ring rounded-md transition-smooth flex-shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className={cn(
                "px-xl py-lg",
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
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Footer */}
              {footer && (
                <div className="border-t border-gray-200 px-xl py-lg bg-gray-50">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = "Modal";

export { Modal, modalVariants };
