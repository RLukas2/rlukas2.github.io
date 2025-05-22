/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class', // This enables dark mode with the 'dark' class on HTML element
    theme: {
        extend: {
            colors: {
                // Primary colors with variants
                primary: 'var(--primary)',
                'primary-dark': 'var(--primary-dark)',
                'primary-light': 'var(--primary-light)',
                'primary-50': 'var(--primary-50)',
                'primary-100': 'var(--primary-100)',
                'primary-200': 'var(--primary-200)',
                'primary-700': 'var(--primary-700)',
                'primary-800': 'var(--primary-800)',
                'primary-900': 'var(--primary-900)',

                // Secondary colors
                secondary: 'var(--secondary)',
                'secondary-dark': 'var(--secondary-dark)',
                'secondary-light': 'var(--secondary-light)',

                // Background and foreground colors
                background: 'var(--background)',
                'background-secondary': 'var(--background-secondary)',
                'background-tertiary': 'var(--background-tertiary)',
                foreground: 'var(--foreground)',
                'foreground-secondary': 'var(--foreground-secondary)',
                'foreground-tertiary': 'var(--foreground-tertiary)',

                // Status colors
                success: 'var(--success)',
                error: 'var(--error)',
                warning: 'var(--warning)',
                info: 'var(--info)',

                // UI Element colors
                border: 'var(--border)',
                'border-dark': 'var(--border-dark)',
                card: 'var(--card)',
                'card-foreground': 'var(--card-foreground)',
                'card-hover': 'var(--card-hover)',

                // Accent colors
                'accent-purple': 'var(--accent-purple)',
                'accent-pink': 'var(--accent-pink)',
                'accent-orange': 'var(--accent-orange)',
                'accent-teal': 'var(--accent-teal)',
            },

            // Box shadows
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'DEFAULT': 'var(--shadow)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
            },

            // Border radius
            borderRadius: {
                'DEFAULT': 'var(--border-radius)',
            },

            // Backdrop blur
            backdropBlur: {
                'xs': '2px',
                'sm': 'var(--blur-sm)',
                'md': 'var(--blur-md)',
                'lg': 'var(--blur-lg)',
            },

            // Animations
            animation: {
                'gradient': 'gradient 15s ease infinite',
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'typing': 'typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
                'bounce-slow': 'bounce 2s infinite',
                'slide-in-right': 'slideInRight 0.5s ease-out',
                'slide-in-left': 'slideInLeft 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'ripple': 'ripple 0.6s ease-out',
                'shine': 'shine 3s infinite',
                'pulse-mode': 'pulseMode 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },

            // Keyframes for animations
            keyframes: {
                gradient: {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' },
                },
                fadeIn: {
                    'from': { opacity: 0 },
                    'to': { opacity: 1 },
                },
                slideUp: {
                    'from': { transform: 'translateY(30px)', opacity: 0 },
                    'to': { transform: 'translateY(0)', opacity: 1 },
                },
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' },
                },
                typing: {
                    'from': { width: 0 },
                    'to': { width: '100%' },
                },
                'blink-caret': {
                    'from, to': { 'border-color': 'transparent' },
                    '50%': { 'border-color': 'var(--primary)' },
                },
                slideInRight: {
                    'from': { transform: 'translateX(30px)', opacity: 0 },
                    'to': { transform: 'translateX(0)', opacity: 1 },
                },
                slideInLeft: {
                    'from': { transform: 'translateX(-30px)', opacity: 0 },
                    'to': { transform: 'translateX(0)', opacity: 1 },
                },
                fadeInUp: {
                    'from': { transform: 'translateY(20px)', opacity: 0 },
                    'to': { transform: 'translateY(0)', opacity: 1 },
                },
                fadeInDown: {
                    'from': { transform: 'translateY(-20px)', opacity: 0 },
                    'to': { transform: 'translateY(0)', opacity: 1 },
                },
                scaleIn: {
                    'from': { transform: 'scale(0.9)', opacity: 0 },
                    'to': { transform: 'scale(1)', opacity: 1 },
                },
                ripple: {
                    '0%': { transform: 'scale(0, 0)', opacity: 0.5 },
                    '20%': { transform: 'scale(25, 25)', opacity: 0.5 },
                    '100%': { opacity: 0, transform: 'scale(40, 40)' },
                },
                shine: {
                    'from': { left: '-150%' },
                    'to': { left: '150%' },
                },
                pulseMode: {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.85, transform: 'scale(0.98)' },
                }
            },

            // Typography
            fontFamily: {
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
            },

            // Add responsive height utilities
            height: {
                'screen-50': '50vh',
                'screen-75': '75vh',
                'screen-80': '80vh',
                'screen-90': '90vh',
            },

            // Responsive spacing
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
                '128': '32rem',
            },

            // Z-index utility
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },

            // Transitions
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
                'width': 'width',
                'position': 'top, right, bottom, left',
                'theme': 'background-color, color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
            },
            transitionTimingFunction: {
                'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                '250': '250ms',
                '400': '400ms',
            },

            // Gradient utilities
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-diagonal': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)',
                'gradient-cool': 'linear-gradient(135deg, var(--primary) 0%, var(--accent-teal) 100%)',
                'gradient-warm': 'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-pink) 100%)',
            },
        },
    },
    plugins: [
        // Add a custom plugin to support theme transition
        function ({ addUtilities }) {
            const newUtilities = {
                '.transition-theme': {
                    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, fill 0.3s ease, stroke 0.3s ease',
                },
                '.no-flickering': {
                    '-webkit-transform': 'translateZ(0)',
                    '-moz-transform': 'translateZ(0)',
                    '-ms-transform': 'translateZ(0)',
                    '-o-transform': 'translateZ(0)',
                    'transform': 'translateZ(0)',
                    'backface-visibility': 'hidden',
                },
            }
            addUtilities(newUtilities, ['responsive', 'hover'])
        },
    ],
    // JIT mode is enabled by default in Tailwind v3+
    future: {
        hoverOnlyWhenSupported: true,
    }
}