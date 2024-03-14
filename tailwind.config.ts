import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import defaultTheme from "tailwindcss/defaultTheme";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      screens: {
        tab: { max: "991px" },
        // => @media (max-width: 991px) { ... }
        mob: { max: "767px" },
        // => @media (max-width: 767px) { ... }
        medium: { min: "992px", max: "1240px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            success: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#24984E",
            },
            danger: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "rgb(220 38 38)",
            },
          },
        },
        dark: {
          colors: {
            success: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#24984E",
            },
            danger: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "rgb(220 38 38)",
            },
          },
        },
      },
    }),
  ],
};
export default config;
