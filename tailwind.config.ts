import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colors: {
          'custom-blue': '#1677ff',
          'custom-blue-opacity': '#1677ff0f', // 背景颜色
        },
        backgroundColor: {
          'custom-blue-opacity': '#1677ff0f', // 添加带有透明度的背景颜色
        },
        borderColor: {
          'custom-blue-opacity': '#1677ff34', // 添加带有透明度的边框颜色
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
} satisfies Config;
