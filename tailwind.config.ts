import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        "bg-primary": "#0A0A0A",
        "bg-secondary": "#1A1A1A",
        "bg-tertiary": "#1E1E1E",
        "bg-quaternary": "#2A2A2A",
        "bg-hover": "#333333",
        "bg-active": "#3A3A3A",
        "bg-active-hover": "#454545",
        // Text colors
        "text-primary": "#FFFFFF",
        "text-secondary": "#FFFFFFA3",
        "text-tertiary": "#FFFFFF80",
        "text-muted": "#6B6B6B",
        // Border colors
        "border-default": "#FFFFFF29",
        "border-hover": "#FFFFFF66",
        "border-active": "#FFFFFF17",
        // Icon colors
        "icon-default": "#E5E5E5",
        "icon-muted": "#FFFFFF4D",
        // Accent colors
        "accent-blue": "#4A9EFF",
        "accent-orange": "#FF8A00",
        // Shades
        "shades-primary-5000": "var(--Shades-Primary-5000, #E4E6E8)",
        "shades-primary-1100": "var(--Shades-Primary-1100, #898C92)",
        "shades-primary-1000": "var(--Shades-Primary-1000, #777A80)",
        "shades-primary-250": "var(--Shades-Primary-250, #212529)",
      },
      spacing: {
        "37": "37px",
        "48": "48px",
      },
      borderRadius: {
        "32": "32px",
      },
      fontSize: {
        "12": "12px",
        "14": "14px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "48": "48px",
      },
      lineHeight: {
        "31": "31px",
        "58": "58px",
        "146": "146%",
      },
      letterSpacing: {
        "01": "0.01em",
        "02": "0.02em",
      },
      backgroundImage: {
        "gradient-orange":
          "linear-gradient(135deg, rgba(255, 138, 0, 0.6) 0%, rgba(255, 196, 0, 0.4) 50%, rgba(255, 138, 0, 0.6) 100%)",
        "gradient-promotional":
          "linear-gradient(233.67deg, rgba(48, 7, 255, 0.29) -2.43%, rgba(209, 40, 150, 0.271346) 58.32%, rgba(255, 86, 35, 0.25) 98.83%), linear-gradient(0deg, var(--Shades-Primary-200, #1D2125), var(--Shades-Primary-200, #1D2125))",
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      keyframes: {
        "profile-slide-in": {
          "0%": { opacity: "0", transform: "translateY(-32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "profile-slide-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-32px)" },
        },
        "backdrop-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "backdrop-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "profile-slide-in":
          "profile-slide-in 0.65s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "profile-slide-out":
          "profile-slide-out 0.65s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "backdrop-fade-in": "backdrop-fade-in 0.5s ease-out forwards",
        "backdrop-fade-out": "backdrop-fade-out 0.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};

export default config;
