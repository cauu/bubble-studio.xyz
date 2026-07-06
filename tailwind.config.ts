import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        ink: 'var(--ink)',
        body: 'var(--body)',
        'body-strong': 'var(--body-strong)',
        muted: 'var(--muted)',
        'muted-soft': 'var(--muted-soft)',
        hairline: {
          DEFAULT: 'var(--hairline)',
          soft: 'var(--hairline-soft)'
        },
        surface: {
          blank: 'var(--blank)',
          soft: 'var(--soft)',
          card: 'var(--card)',
          dark: 'var(--dark)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          active: 'var(--primary-active)'
        },
        brand: {
          orange: 'var(--orange)',
          lavender: 'var(--lavender)',
          sky: 'var(--sky)',
          lemon: 'var(--lemon)',
          grass: 'var(--grass)',
          sea: 'var(--sea)',
          mint: 'var(--mint)',
          incana: 'var(--teal)'
        },
        'on-dark': '#ffffff'
      },
      // Token contract from DESIGN-bubble-light.md — intentionally remaps Tailwind's scale
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        pill: '999px'
      },
      spacing: {
        section: '96px'
      },
      maxWidth: {
        wrap: '1180px'
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'AlibabaPuHuiTi',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif'
        ]
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.22,.9,.35,1)'
      },
      // Apple-style layered shadows (redesign-v2 final prototypes)
      boxShadow: {
        card: '0 2px 6px rgba(23,32,38,.04), 0 12px 32px rgba(23,32,38,.07)',
        'card-hover': '0 4px 12px rgba(23,32,38,.05), 0 24px 56px rgba(23,32,38,.11)',
        soft: '0 1px 2px rgba(23,32,38,.05), 0 4px 12px rgba(23,32,38,.06)',
        'soft-hover': '0 2px 4px rgba(23,32,38,.05), 0 8px 20px rgba(23,32,38,.09)'
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '.55' }
        },
        'aura-drift': {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(6%,-4%,0) scale(1.12)' },
          '100%': { transform: 'translate3d(-5%,3%,0) scale(1.04)' }
        }
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        'aura-drift': 'aura-drift 10s ease-in-out infinite alternate'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;
