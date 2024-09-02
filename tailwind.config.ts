import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Amsterdam: ["New Amsterdam", "sans-serif"], 
        teko : ["Teko" , "sans-serif"],
        mate : ["Matemasie" , "sans-serif"],
        tint : ["Bungee Tint" , "sans-serif"],
        Pacifico : ["Pacifico" , "sans-serif"],
        Arabic : ['Noto Sans Arabic' , 'sans-serif'],
        broken : ["Rubik Broken Fax" , "sans-serif"] ,
        diss : ["Rubik Distressed" , "sans-serif"] ,
        modak : ["Modak" , "sans-serif"] ,
        vina : ["Vina Sans" , "sans"]

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'mobile': {'min': '400px', 'max': '640px'}, // Custom breakpoint starting at 400px
        // You can also define ranges, but Tailwind's philosophy is mobile-first
        // and it's typically easier to work upwards from a smaller base.
      },
    },
  },
  plugins: [],
};
export default config;
