import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // COLOR PALETTE (From Design System)
      colors: {
        // Primary
        "brand-blue": "#0052CC",
        "brand-blue-light": "#F0F6FF",
        "brand-blue-dark": "#003D99",

        // Secondary
        emerald: {
          DEFAULT: "#10B981",
        },

        amber: {
          DEFAULT: "#F59E0B",
        },

        rose: {
          DEFAULT: "#EF4444",
        },

        // Neutral Grayscale
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },

      // TYPOGRAPHY
      fontSize: {
        "h1-desktop": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h1-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2-desktop": ["36px", { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h2-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h3-desktop": ["28px", { lineHeight: "36px", letterSpacing: "0", fontWeight: "600" }],
        "h3-mobile": ["20px", { lineHeight: "28px", letterSpacing: "0", fontWeight: "600" }],
        "h4-desktop": ["20px", { lineHeight: "28px", letterSpacing: "0", fontWeight: "600" }],
        "h4-mobile": ["18px", { lineHeight: "26px", letterSpacing: "0", fontWeight: "600" }],
        "h5": ["16px", { lineHeight: "24px", letterSpacing: "0", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-xs": ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Fira Code", "Monaco", "monospace"],
      },

      // SPACING (8px grid)
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "64px",
      },

      // SHADOWS
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        "brand-sm": "0 1px 3px 0 rgba(0, 82, 204, 0.05)",
        "brand-md": "0 4px 6px -1px rgba(0, 82, 204, 0.1)",
        "brand-lg": "0 10px 15px -3px rgba(0, 82, 204, 0.1)",
      },

      // BORDER RADIUS
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },

      // ANIMATIONS
      animation: {
        "fade-in": "fadeIn 300ms ease-out",
        "slide-up": "slideUp 300ms ease-out",
        "slide-down": "slideDown 300ms ease-out",
        "scale-in": "scaleIn 150ms ease-out",
        "spin-slow": "spin 600ms linear infinite",
        "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },

      // TRANSITIONS
      transitionDuration: {
        fast: "150ms",
        standard: "300ms",
        slow: "500ms",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
      },

      // CONTAINER
      maxWidth: {
        container: "1280px",
      },

      // BACKGROUND IMAGES
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at center top, rgb(255 255 255 / 0.4), transparent)",
      },

      // RESPONSIVE BREAKPOINTS (Mobile First)
      screens: {
        xs: "0px",
        sm: "480px",
        md: "640px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1536px",
      },
    },
  },

  plugins: [
    // Custom utilities
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".focus-ring": {
          "@apply outline-none ring-2 ring-brand-blue ring-offset-2": {},
        },
        ".disabled-state": {
          "@apply opacity-60 cursor-not-allowed": {},
        },
        ".transition-fast": {
          "@apply transition-all duration-fast": {},
        },
        ".transition-standard": {
          "@apply transition-all duration-standard": {},
        },
        ".transition-smooth": {
          "@apply transition-all duration-standard ease-smooth": {},
        },
      });
    },
  ],
};

export default config;
