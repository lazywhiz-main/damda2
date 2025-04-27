import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        'ivory': '#FFFFF0',
        'ink': '#1A1A1A',
        'light-ink': '#4A4A4A',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)'],
        handwriting: ['var(--font-handwriting)'],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      typography: {
        ink: {
          css: {
            '--tw-prose-body': '#1a1a1a',
            '--tw-prose-headings': '#1a1a1a',
            '--tw-prose-lead': '#1a1a1a',
            '--tw-prose-links': '#1a1a1a',
            '--tw-prose-bold': '#1a1a1a',
            '--tw-prose-counters': '#1a1a1a',
            '--tw-prose-bullets': '#1a1a1a',
            '--tw-prose-hr': '#e5e5e5',
            '--tw-prose-quotes': '#1a1a1a',
            '--tw-prose-quote-borders': '#e5e5e5',
            '--tw-prose-captions': '#6b7280',
            '--tw-prose-code': '#1a1a1a',
            '--tw-prose-pre-code': '#e5e5e5',
            '--tw-prose-pre-bg': '#1a1a1a',
            '--tw-prose-th-borders': '#e5e5e5',
            '--tw-prose-td-borders': '#e5e5e5',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 