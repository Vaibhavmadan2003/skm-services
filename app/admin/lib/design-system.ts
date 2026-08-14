/**
 * Admin Dashboard Design System
 * Comprehensive design tokens for enterprise admin interface
 * Based on home-service-qatar brand guidelines
 */

export const designSystem = {
  // ============================================================
  // COLORS
  // ============================================================
  colors: {
    // Primary - Brand Blue (Trust & Professionalism)
    primary: {
      DEFAULT: "#0052CC",
      light: "#F0F6FF",
      lighter: "#E0EFFF",
      dark: "#003D99",
      darker: "#002E66",
      50: "#F0F6FF",
      100: "#E0EFFF",
      200: "#C0DEFF",
      500: "#0052CC",
      600: "#003D99",
      700: "#002E66",
    },

    // Success - Emerald Green
    success: {
      DEFAULT: "#10B981",
      light: "#D1FAE5",
      lighter: "#ECFDF5",
      dark: "#059669",
      50: "#F0FDF4",
      100: "#DCFCE7",
      500: "#10B981",
      600: "#059669",
      700: "#047857",
    },

    // Warning - Amber
    warning: {
      DEFAULT: "#F59E0B",
      light: "#FEF3C7",
      lighter: "#FFFBEB",
      dark: "#D97706",
      50: "#FFFBEB",
      100: "#FEF3C7",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
    },

    // Danger - Rose Red
    danger: {
      DEFAULT: "#EF4444",
      light: "#FEE2E2",
      lighter: "#FEF2F2",
      dark: "#DC2626",
      50: "#FEF2F2",
      100: "#FEE2E2",
      500: "#EF4444",
      600: "#DC2626",
      700: "#B91C1C",
    },

    // Info - Brand Blue (Secondary use)
    info: {
      DEFAULT: "#0052CC",
      light: "#DBEAFE",
      lighter: "#F0F9FF",
      dark: "#1E40AF",
      50: "#F0F9FF",
      100: "#E0F2FE",
      500: "#0284C7",
      600: "#0369A1",
      700: "#075985",
    },

    // Neutral Grayscale
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      150: "#ECECF1",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
      950: "#030712",
    },

    // Semantic
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      tertiary: "#6B7280",
      muted: "#9CA3AF",
      inverse: "#F9FAFB",
    },

    // Backgrounds
    background: {
      primary: "#FFFFFF",
      secondary: "#F9FAFB",
      tertiary: "#F3F4F6",
      elevated: "#FFFFFF",
      overlay: "rgba(0, 0, 0, 0.5)",
    },

    // Borders
    border: {
      light: "#E5E7EB",
      DEFAULT: "#D1D5DB",
      dark: "#9CA3AF",
    },
  },

  // ============================================================
  // TYPOGRAPHY
  // ============================================================
  typography: {
    // Font Families
    fontFamily: {
      base: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif',
      mono: '"Fira Code", "Monaco", monospace',
    },

    // Font Sizes
    fontSize: {
      // Display/Headings
      h1: { size: 48, lineHeight: 56, weight: 700, letterSpacing: -0.02 },
      h2: { size: 36, lineHeight: 44, weight: 600, letterSpacing: -0.01 },
      h3: { size: 28, lineHeight: 36, weight: 600, letterSpacing: 0 },
      h4: { size: 20, lineHeight: 28, weight: 600, letterSpacing: 0 },
      h5: { size: 16, lineHeight: 24, weight: 600, letterSpacing: 0 },

      // Body Text
      "body-lg": { size: 18, lineHeight: 28, weight: 400, letterSpacing: 0 },
      body: { size: 16, lineHeight: 24, weight: 400, letterSpacing: 0 },
      "body-sm": { size: 14, lineHeight: 20, weight: 400, letterSpacing: 0 },
      "body-xs": { size: 12, lineHeight: 16, weight: 400, letterSpacing: 0 },

      // UI Elements
      label: { size: 14, lineHeight: 20, weight: 600, letterSpacing: 0 },
      caption: { size: 12, lineHeight: 16, weight: 500, letterSpacing: 0 },
      overline: { size: 11, lineHeight: 16, weight: 700, letterSpacing: 0.05 },
    },

    // Font Weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },

    // Letter Spacing
    letterSpacing: {
      tight: -0.02,
      normal: 0,
      wide: 0.05,
    },
  },

  // ============================================================
  // SPACING (4px base unit)
  // ============================================================
  spacing: {
    // 4px based scale
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",

    // Common use cases
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
    "4xl": "64px",
  },

  // ============================================================
  // SHADOWS
  // ============================================================
  shadows: {
    // Soft shadows (default)
    soft: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },

    // Medium shadows
    medium: {
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      md: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
      lg: "0 12px 24px 0 rgba(0, 0, 0, 0.15)",
      xl: "0 20px 40px 0 rgba(0, 0, 0, 0.2)",
    },

    // Strong shadows (depth)
    strong: {
      sm: "0 2px 4px 0 rgba(0, 0, 0, 0.15)",
      md: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
      lg: "0 16px 32px 0 rgba(0, 0, 0, 0.25)",
      xl: "0 24px 48px 0 rgba(0, 0, 0, 0.3)",
    },

    // Elevated card (admin dashboard cards)
    elevated: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    interactive: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",

    // Brand color shadows
    brand: {
      sm: "0 1px 3px 0 rgba(0, 82, 204, 0.05)",
      md: "0 4px 6px -1px rgba(0, 82, 204, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 82, 204, 0.1)",
    },

    // Focus/Active states
    focus: "0 0 0 3px rgba(0, 82, 204, 0.1)",
    focusStrong: "0 0 0 4px rgba(0, 82, 204, 0.2)",

    // No shadow
    none: "none",
  },

  // ============================================================
  // BORDER RADIUS
  // ============================================================
  borderRadius: {
    none: "0",
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    "3xl": "24px",
    full: "9999px",
  },

  // ============================================================
  // BREAKPOINTS (Mobile First)
  // ============================================================
  breakpoints: {
    xs: "0px",
    sm: "480px",
    md: "640px",
    lg: "768px",
    xl: "1024px",
    "2xl": "1280px",
    "3xl": "1536px",
  },

  // ============================================================
  // Z-INDEX SCALE
  // ============================================================
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    backdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // ============================================================
  // TRANSITIONS
  // ============================================================
  transitions: {
    // Durations
    duration: {
      fast: "150ms",
      standard: "300ms",
      slow: "500ms",
      slower: "700ms",
    },

    // Timing Functions
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      linear: "linear",
    },

    // Common transitions
    common: {
      color: "color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      background: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      border: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      shadow: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      all: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // ============================================================
  // CONTAINER SIZES
  // ============================================================
  container: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
    full: "100%",
  },

  // ============================================================
  // COMPONENT-SPECIFIC TOKENS
  // ============================================================
  components: {
    button: {
      height: {
        sm: "32px",
        md: "40px",
        lg: "48px",
      },
      padding: {
        sm: "8px 16px",
        md: "12px 24px",
        lg: "16px 32px",
      },
      borderRadius: "8px",
      fontWeight: 600,
    },

    input: {
      height: "40px",
      padding: "12px 16px",
      borderRadius: "8px",
      borderWidth: "1px",
      fontSize: "16px",
    },

    card: {
      padding: {
        sm: "16px",
        md: "24px",
        lg: "32px",
      },
      borderRadius: "12px",
      borderWidth: "1px",
    },

    modal: {
      borderRadius: "12px",
      shadowSize: "xl",
      backdropOpacity: "0.5",
    },
  },
};

// Export type for TypeScript
export type DesignSystem = typeof designSystem;
