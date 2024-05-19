/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        txt: {
          primary: {
            default: "var(--txt-primary)"
          }
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
        btn: "var(--btn-border-radius)",
      },
      boxShadow: {
        primary: "var(--primary-shadow)",
      },
    },
  },
  plugins: [],
};
