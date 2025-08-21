/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        medical: {
          primary: {
            DEFAULT: 'var(--color-medical-primary)',
            light: 'var(--color-medical-primary-light)',
            dark: 'var(--color-medical-primary-dark)',
          },
          secondary: {
            DEFAULT: 'var(--color-medical-secondary)',
            light: 'var(--color-medical-secondary-light)',
            dark: 'var(--color-medical-secondary-dark)',
          },
          accent: {
            DEFAULT: 'var(--color-medical-accent)',
            light: 'var(--color-medical-accent-light)',
            dark: 'var(--color-medical-accent-dark)',
          },
          cancer: {
            prostate: 'var(--color-medical-prostate)',
            lung: 'var(--color-medical-lung)',
            gynecologic: 'var(--color-medical-gynecologic)',
            gi: 'var(--color-medical-gi)',
          },
          gray: {
            50: 'var(--color-medical-gray-50)',
            100: 'var(--color-medical-gray-100)',
            200: 'var(--color-medical-gray-200)',
            300: 'var(--color-medical-gray-300)',
            400: 'var(--color-medical-gray-400)',
            500: 'var(--color-medical-gray-500)',
            600: 'var(--color-medical-gray-600)',
            700: 'var(--color-medical-gray-700)',
            800: 'var(--color-medical-gray-800)',
            900: 'var(--color-medical-gray-900)',
          },
          success: 'var(--color-medical-success)',
          warning: 'var(--color-medical-warning)',
          error: 'var(--color-medical-error)',
          info: 'var(--color-medical-info)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
