import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired Monochrome & Titanium Grayscale
        obsidian: {
          950: '#000000',
          900: '#050507',
          800: '#0b0b0e',
          700: '#111115',
          600: '#18181d',
          500: '#22222a',
        },
        titanium: {
          50: '#f9f9fb',
          100: '#f2f2f5',
          200: '#e4e4e9',
          300: '#d1d1d8',
          400: '#9e9ea9',
          500: '#71717f',
          600: '#52525e',
          700: '#383842',
          800: '#26262d',
          900: '#19191e',
        },
        // Backward compatibility mappings for smooth gradient transitions
        neon: {
          50: '#f4f4f6',
          100: '#e8e8ed',
          200: '#d2d2dc',
          300: '#b4b4c2',
          400: '#94a3b8',
          500: '#e2e8f0', // Clean platinum
          600: '#cbd5e1',
          700: '#94a3b8',
          800: '#64748b',
          900: '#334155',
          950: '#0f172a',
        },
        electric: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        ink: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f7', // Apple warm gray
          300: '#e5e5ea',
          400: '#d1d1d6',
          500: '#8e8e93',
          600: '#636366',
          700: '#48484a',
          800: '#2c2c2e',
          900: '#1c1c1e',
          950: '#000000',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Inter', 'sans-serif'],
        display: ['var(--font-outfit)', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'apple-radial': 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
        'silver-glow': 'radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 60%)',
      },
      boxShadow: {
        'apple': '0 8px 30px rgba(0, 0, 0, 0.5)',
        'apple-card': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'apple-card-hover': '0 12px 36px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.16)',
        'apple-btn': '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
