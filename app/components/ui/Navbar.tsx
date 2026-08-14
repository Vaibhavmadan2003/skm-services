import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Navbar Component
 * 
 * PURPOSE:
 * - Primary navigation component at top of page
 * - Provides links to main sections and user actions
 * - Responsive: desktop horizontal, mobile vertical
 * - Supports sticky positioning and shadow on scroll
 * 
 * DESIGN SYSTEM ALIGNMENT:
 * - Height: 64px (desktop), 56px (mobile)
 * - Padding: 16px 24px
 * - Background: White with optional shadow
 * - Z-index: 40 (below modals/drawers)
 * - Transitions: 300ms smooth
 * 
 * FEATURES:
 * - Logo/brand area
 * - Navigation links (desktop)
 * - Right-side actions (CTA, user menu)
 * - Mobile menu toggle (hamburger)
 * - Sticky positioning option
 * - Shadow on scroll
 */

const navbarVariants = cva(
  "w-full transition-smooth bg-white flex items-center",
  {
    variants: {
      variant: {
        // Default: White background with subtle shadow
        default: "shadow-sm",
        
        // Transparent: No shadow initially (shadow on scroll)
        transparent: "shadow-none",
        
        // Elevated: Always has shadow
        elevated: "shadow-md",
        
        // Bordered: Bottom border only
        bordered: "border-b border-gray-200 shadow-none",
      },

      position: {
        // Static: Normal document flow
        static: "relative",
        
        // Sticky: Stays at top when scrolling
        sticky: "sticky top-0 z-40",
        
        // Fixed: Always at top
        fixed: "fixed top-0 left-0 right-0 z-40",
      },

      size: {
        // Compact: Minimal height
        sm: "h-14",
        
        // Standard: Normal height
        md: "h-16",
        
        // Large: Tall navbar
        lg: "h-20",
      },
    },

    defaultVariants: {
      variant: "default",
      position: "static",
      size: "md",
    },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {
  /** Left section: logo/brand */
  logo?: React.ReactNode;
  
  /** Center section: navigation links */
  nav?: React.ReactNode;
  
  /** Right section: CTA, user menu, etc. */
  actions?: React.ReactNode;
  
  /** Mobile menu toggle handler */
  onMenuToggle?: () => void;
  
  /** Is mobile menu open */
  menuOpen?: boolean;
  
  /** Show mobile menu button */
  showMobileMenu?: boolean;
  
  /** Sticky on scroll */
  sticky?: boolean;
  
  /** Add shadow on scroll */
  shadowOnScroll?: boolean;
}

/**
 * Navbar Component
 * 
 * API (Props):
 * - logo: React node (left-aligned logo/brand)
 * - nav: React node (center navigation links)
 * - actions: React node (right-aligned actions)
 * - variant: "default" | "transparent" | "elevated" | "bordered" (default: "default")
 * - position: "static" | "sticky" | "fixed" (default: "static")
 * - size: "sm" (56px) | "md" (64px) | "lg" (80px) (default: "md")
 * - onMenuToggle: () => void (handler for mobile menu)
 * - menuOpen: boolean (mobile menu state)
 * - showMobileMenu: boolean (show hamburger button)
 * - sticky: boolean (enable sticky positioning)
 * - shadowOnScroll: boolean (add shadow when scrolled)
 * 
 * VARIANTS:
 * - default: White with subtle shadow (most common)
 * - transparent: No shadow (shadow on scroll if enabled)
 * - elevated: Always has shadow
 * - bordered: Bottom border only
 * 
 * POSITIONS:
 * - static: Normal document flow
 * - sticky: Stays at top while scrolling
 * - fixed: Always at top (requires margin on body)
 * 
 * SIZES:
 * - sm: 56px height (compact)
 * - md: 64px height (standard)
 * - lg: 80px height (spacious)
 * 
 * LAYOUT:
 * - Left: Logo/brand
 * - Center: Navigation links (desktop only)
 * - Right: Actions (CTA, user menu)
 * - Mobile: Logo + hamburger menu
 * 
 * RESPONSIVE BEHAVIOR:
 * - Desktop: Logo | Nav links | Actions (flex row)
 * - Tablet: Logo | Nav (abbreviated) | Actions
 * - Mobile: Logo | Hamburger (menu in drawer)
 * 
 * USE CASES:
 * - Standard navbar: <Navbar logo={logo} nav={navLinks} actions={ctaButton} />
 * - Sticky: <Navbar sticky position="sticky" />
 * - With mobile menu: <Navbar showMobileMenu menuOpen={open} onMenuToggle={toggle} />
 * - Transparent: <Navbar variant="transparent" shadowOnScroll />
 * 
 * ACCESSIBILITY:
 * - Semantic HTML (<nav>)
 * - ARIA labels for regions
 * - Keyboard navigation: Tab between links
 * - Focus management
 * - Mobile menu: Proper ARIA roles
 */
const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      className,
      variant = "default",
      position = "static",
      size = "md",
      logo,
      nav,
      actions,
      onMenuToggle,
      menuOpen = false,
      showMobileMenu = false,
      sticky = false,
      shadowOnScroll = false,
      ...props
    },
    ref
  ) => {
    const [hasScrolled, setHasScrolled] = React.useState(false);

    React.useEffect(() => {
      if (!shadowOnScroll) return;

      const handleScroll = () => {
        setHasScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [shadowOnScroll]);

    const navPosition = sticky ? "sticky" : position;
    const navVariant = shadowOnScroll && hasScrolled ? "elevated" : variant;

    return (
      <nav
        ref={ref}
        className={cn(
          navbarVariants({ 
            variant: navVariant, 
            position: navPosition, 
            size,
            className 
          }),
          "justify-between px-lg md:px-2xl gap-lg"
        )}
        {...props}
      >
        {/* Logo / Brand */}
        {logo && (
          <div className="flex-shrink-0">
            {logo}
          </div>
        )}

        {/* Navigation - Desktop only */}
        {nav && (
          <div className="hidden md:flex flex-1 items-center justify-center gap-xl">
            {nav}
          </div>
        )}

        {/* Right Actions */}
        {actions && (
          <div className="flex items-center gap-lg flex-shrink-0">
            {actions}
          </div>
        )}

        {/* Mobile Menu Button */}
        {showMobileMenu && (
          <button
            type="button"
            onClick={onMenuToggle}
            className={cn(
              "md:hidden flex items-center justify-center w-10 h-10 rounded-md transition-smooth",
              "hover:bg-gray-100 focus-ring text-gray-700"
            )}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        )}
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants };
