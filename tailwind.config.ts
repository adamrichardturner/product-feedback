import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0rem",
        sm: "0rem",
        lg: "2rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "100%",
        md: "726px",
        lg: "984px",
        xl: "1280px",
      },
    },
    extend: {
      fontSize: {
        sm: "14px",
        md: "18px",
        lg: "20px",
        xl: "24px",
        body1: "16px",
        body2: "15px",
        body3: "13px",
      },
      lineHeight: {
        sm: "20px",
        md: "26px",
        lg: "29px",
        xl: "35px",
        body1: "23px",
        body2: "22px",
        body3: "19px",
      },
      letterSpacing: {
        sm: "-0.2px",
        md: "-0.25px",
        lg: "-0.25px",
        xl: "-0.33px",
      },
      colors: {
        border: "hsl(var(--border))",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "title-gradient": "var(--title-gradient)",
        txt: {
          primary: {
            DEFAULT: "var(--txt-primary)",
          },
          secondary: {
            DEFAULT: "var(--txt-secondary)",
          },
        },
        btn: {
          primary: {
            background: "var(--btn-primary-background)",
            "background-hover": "var(--btn-primary-hover)",
          },
          secondary: {
            background: "var(--btn-secondary-background)",
            "background-hover": "var(--btn-secondary-hover)",
          },
          tertiary: {
            background: "var(--btn-tertiary-background)",
            "background-hover": "var(--btn-tertiary-hover)",
          },
          danger: {
            background: "var(--btn-danger-background)",
            "background-hover": "var(--btn-danger-hover)",
          },
          back: {
            background: "var(--btn-back-background)",
          },
          upvote: {
            background: "var(--btn-upvote-background)",
            "background-hover": "var(--btn-upvote-hover)",
            active: "var(--btn-upvote-active)",
          },
          sort: {
            background: "var(--btn-sort-background)",
          },
        },
        input: {
          default: "var(--input-default-background)",
          filled: "var(--input-filled-background)",
          active: "var(--input-active-background)",
          "active-border": "var(--input-active-border)",
          "error-border": "var(--input-error-border)",
        },
        dropdown: {
          default: "var(--dropdown-default-background)",
          "active-border": "var(--dropdown-active-border)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        btn: "var(--btn-border-radius)",
      },
      boxShadow: {
        primary: "var(--primary-shadow)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(circle at bottom right, #FBB57A, #E84D70, #A337F6, #28A7ED)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
