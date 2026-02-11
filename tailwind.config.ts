import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#FF6B35",
                    hover: "#E85A2A",
                    light: "#FF8C61",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#243447",
                    foreground: "#FFFFFF",
                },
                background: {
                    DEFAULT: "#FAFAFA",
                    alt: "#F4F4F4",
                    dark: "#0B0F14",
                },
                foreground: {
                    DEFAULT: "#101214",
                    muted: "#575757",
                },
                kraft: "#C4A57B",
                eco: "#4CAF50",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
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
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                marquee: "marquee 120s linear infinite",
                "marquee-reverse": "marquee-reverse 120s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
