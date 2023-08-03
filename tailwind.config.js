/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        "gray-f3f6f9": "#f3f6f9",
        "gray-ebedf3": "#ebedf3",
        "gray-7e8299": "#7e8299",
        "gray-b5b5c3": "#b5b5c3",
        "gray-e4e6ef": "#e4e6ef",
        "gray-e0e0e0": "#e0e0e0",
        "gray-ebedf3": "#ebedf3",

        "black-3f4254": "#3f4254",
        "black-181c32": "#181c32",
        "black-5e6278": "#5e6278",
        "black-7e8299": "#7e8299",
        "black-000000DE": "#000000DE",

        "green-1bc5bd": "#1bc5bd",
        "green-0bb7af": "#0bb7af",
        "green-c9f7f5": "#c9f7f5",
        "green-1bc5bd": "#1bc5bd",
        "green-12827c": "#12827c",

        "blue-3699ff": "#3699ff",

        "red-f64e60": "#f64e60",
        "red-ffe2e5": "#ffe2e5",
        "red-f64e60": "#f64e60",
        "red-ee2d41": "#ee2d41",

        "border-color": "#ebedf3",

        "bg-rgba(0,0,0,.1)": "rgba(0,0,0,.1)",
        "table-dark": "#ebedf3",
        "table-light": "#f3f6f9",
        "table-hover": "#e9ecef",

        primary: "#1bc5bd",
        "primary-hover": "#0bb7af",
      },
      borderRadius: {
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
