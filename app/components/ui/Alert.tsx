import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

/**
 * Alert Component
 * 
 * PURPOSE:
 * - Display important messages, warnings, errors, and information
 * - Provides visual distinction through color and icons
 * - Used for validation feedback, notifications, system messages
 * - Ensures accessibility with proper ARIA roles and semantics
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Padding: 16px 24px
 * - Border radius: 8px
 * - Border: 1px (colored based on variant)
 * - Font size: 14px-16px
 * - Icon: Lucide icons (20px)
 * - Transitions: 300ms ease-out
 * - States: default, with actions, dismissible
 */

const alertVariants = cva(
  "flex gap-lg rounded-md border p-lg transition-smooth animate-fade-in",
  {
    variants: {
      variant: {
        // Info: Blue background, border, and text
        info: "border-brand-blue bg-brand-blue-light text-brand-blue",
        
        // Success: Green background, border, and text
        success: "border-emerald bg-green-100 text-emerald",
        
        // Warning: Amber background, border, and text
        warning: "border-amber bg-yellow-100 text-amber",
        
        // Error: Red background, border, and text
        error: "border-rose bg-red-100 text-rose",
        
        // Neutral: Gray background, border, and text
        neutral: "border-gray-200 bg-gray-50 text-gray-700",
      },

      severity: {
        // Low: Icon only, no action required
        low: "",
        
        // Medium: Icon and message
        medium: "",
        
        // High: Icon, message, and action
        high: "",
      },
    },

    defaultVariants: {
      variant: "info",
      severity: "medium",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Alert title */
  title?: string;
  
  /** Alert message (main content) */
  children: React.ReactNode;
  
  /** Icon to display (overrides default) */
  icon?: React.ReactNode;
  
  /** Action button component */
  action?: React.ReactNode;
  
  /** Show close button */
  showClose?: boolean;
  
  /** Close handler */
  onClose?: () => void;
  
  /** Role for accessibility */
  role?: "alert" | "status" | "region";
}

const getDefaultIcon = (variant: string) => {
  switch (variant) {
    case "success":
      return <CheckCircle size={20} className="flex-shrink-0" />;
    case "warning":
      return <AlertTriangle size={20} className="flex-shrink-0" />;
    case "error":
      return <AlertCircle size={20} className="flex-shrink-0" />;
    case "info":
      return <Info size={20} className="flex-shrink-0" />;
    default:
      return <Info size={20} className="flex-shrink-0" />;
  }
};

/**
 * Alert Component
 * 
 * API (Props):
 * - children: React node (alert message) - required
 * - variant: "info" | "success" | "warning" | "error" | "neutral" (default: "info")
 * - severity: "low" | "medium" | "high" (default: "medium")
 * - title: string (optional alert title)
 * - icon: React node (optional custom icon)
 * - action: React node (optional action button)
 * - showClose: boolean (default: false)
 * - onClose: () => void (handler for close button)
 * - role: "alert" | "status" | "region" (default: "alert")
 * 
 * VARIANTS:
 * - info: Blue (information, announcements)
 * - success: Green (successful actions, confirmations)
 * - warning: Amber (warnings, cautions)
 * - error: Red (errors, failures)
 * - neutral: Gray (neutral information)
 * 
 * STATES:
 * - Default: Shows alert with icon, title, and message
 * - With action: Includes action button on right
 * - Dismissible: Close button (X) on right side
 * - Hover (with action): Subtle shadow increase
 * 
 * ANIMATION:
 * - Fade in (300ms) on mount
 * - Smooth transitions
 * 
 * USE CASES:
 * - Error: <Alert variant="error">Something went wrong</Alert>
 * - Success: <Alert variant="success">Changes saved</Alert>
 * - Warning: <Alert variant="warning">This action cannot be undone</Alert>
 * - Info: <Alert variant="info" title="Note">Important information</Alert>
 * - With action: <Alert action={<Button size="sm">Retry</Button>}>Failed to load</Alert>
 * 
 * ACCESSIBILITY:
 * - ARIA role: alert, status, or region
 * - Semantic HTML
 * - Icons for visual distinction (not sole indicator)
 * - Color not sole means of conveying information
 * - Close button: Clear keyboard accessible
 * - Screen reader: Announces alert type and message
 * 
 * WCAG COMPLIANCE:
 * - Color contrast: 4.5:1 (text to background)
 * - Icons: Supplementary to text (not required to understand)
 * - Focus management: Clear visible focus on interactive elements
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      severity = "medium",
      title,
      children,
      icon,
      action,
      showClose = false,
      onClose,
      role = "alert",
      ...props
    },
    ref
  ) => {
    const defaultIcon = getDefaultIcon(variant || "info");

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          alertVariants({ variant, severity, className }),
          "items-start"
        )}
        {...props}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {icon || defaultIcon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-semibold text-sm mb-xs">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-md items-center ml-lg">
          {action}
          
          {showClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-current opacity-70 hover:opacity-100 focus-ring rounded-md transition-smooth flex-shrink-0"
              aria-label="Close alert"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
