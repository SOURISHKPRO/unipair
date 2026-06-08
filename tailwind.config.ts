import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#E8387A',
          hover: '#F0568E',
          dim: 'rgba(232, 56, 122, 0.12)',
          border: 'rgba(232, 56, 122, 0.28)',
          light: '#F472A8',
        },
        bg: {
          primary: '#0A0810',
          secondary: '#110E1A',
          tertiary: '#181323',
          quaternary: '#1E1729',
        },
        text: {
          primary: '#ffffff',
          muted: 'rgba(255, 255, 255, 0.48)',
          muted2: 'rgba(255, 255, 255, 0.28)',
        },
        border: {
          primary: 'rgba(255, 255, 255, 0.07)',
          secondary: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.88rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.1rem', { lineHeight: '1.75rem' }],
        xl: ['1.2rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2.2rem', { lineHeight: '2.5rem' }],
        '4xl': ['3rem', { lineHeight: '3.5rem' }],
        '5xl': ['4.2rem', { lineHeight: '4.5rem' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      borderRadius: {
        '3xl': '24px',
      },
      backdropFilter: {
        blur: 'blur(16px)',
      },
    },
  },
  plugins: [],
};

export default config;
