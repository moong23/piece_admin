export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        default: "#6F00FB",
        middle: "#D0ABFD",
        light: "#F6EFFF",
      },
      sub: {
        default: "#FF7490",
        middle: "#FFB9C7",
        light: "#FFE3E9",
      },
      grayscale: {
        black: "#1B1A2A",
        dark1: "#484B4D",
        dark2: "#6C7073",
        dark3: "#909599",
        light1: "#CBD1D9",
        light2: "#E8EBF0",
        light3: "#F4F6FA",
        white: "#FFFFFF",
      },
      system: {
        error: "#FF3059",
      },
    },
    fontWeight: {
      semibold: 600,
      medium: 500,
      regular: 400,
    },
    fontSize: {
      "heading-xl": [
        "28px",
        { lineHeight: "40px" },
        { fontWeight: "semibold" },
      ],
      "heading-l": ["24px", { lineHeight: "32px" }, { fontWeight: "semibold" }],
      "heading-m": ["20px", { lineHeight: "24px" }, { fontWeight: "semibold" }],
      "heading-s": ["18px", { lineHeight: "22px" }, { fontWeight: "semibold" }],
      "heading-xs": ["18px", { lineHeight: "22px" }, { fontWeight: "medium" }],
      "body-m-sb": ["16px", { lineHeight: "24px" }, { fontWeight: "semibold" }],
      "body-m-md": ["16px", { lineHeight: "24px" }, { fontWeight: "medium" }],
      "body-m-rg": ["16px", { lineHeight: "24px" }, { fontWeight: "regular" }],
      "body-s-sb": ["14px", { lineHeight: "20px" }, { fontWeight: "semibold" }],
      "body-s-md": ["14px", { lineHeight: "20px" }, { fontWeight: "medium" }],
      "body-s-rg": ["14px", { lineHeight: "20px" }, { fontWeight: "regular" }],
      caption: ["12px", { lineHeight: "16px" }, { fontWeight: "medium" }],
      branding: ["18px", { lineHeight: "22px" }, { fontWeight: "medium" }],
    },
    extend: {},
  },
  plugins: [],
};
