const { bottom } = require('@popperjs/core')
const plugin = require('tailwindcss/plugin')

// import { darken, lighten } from 'polished'
// const primary = '#054826'

module.exports = {
    darkMode: ['class', '[data-mode="dark"]'],
    content: ["./dist/**/*.{html,scss,js}"],
    important: true,
    theme: {
        screens: {
            xs: "100%",
            sm: '540px',
            md: '720px	',
            lg: '960px',
            xl: '1140px',
            '2xl': '1320px',
        },
        
        fontFamily: {
            primary: ['Inter', 'sans-serif'],
            secound: ['Dancing Script', 'sans-serif'],
        }, 
        extend: {
            extend: {
                backgroundOpacity: {
                    '10': '0.1',
                    '20': '0.2',
                    '95': '0.95',
                }
            },

            fontSize: {
                '10': '0.625rem',
                '11': '0.688rem',
                '13': '0.813rem',
                base: '0.938rem',
                '16': '1rem',
                '17': '1.063rem',
                '19': '1.188rem',
                '21': '1.313rem',
                '22': '1.375rem',
            },
            colors: {

                violet: {
                    50: '#E3DBFB',
                    100: '#D5C9FA',
                    200: '#C6B5F9',
                    300: '#AF98F7',
                    400: '#987AF4',
                    500: '#815DF2',
                    600: '#7555DC',
                    700: '#6A4CC6',
                    800: '#5E44B0',
                    900: '#523B9A',
                },
        
                gray: {
                    50: '#f8f9fc',
                    100: '#CCCED6',
                    200: '#B3B5C1',
                    300: '#9A9DAC',
                    400: '#818497',
                    500: '#74788D',
                    600: '#696D80',
                    700: '#5F6273',
                    800: '#545767',
                    900: '#3F414D',
                },
                green: {
                    50: '#C1E1D9',
                    100: '#A4D3C7',
                    200: '#76BCAB',
                    300: '#48A68F',
                    400: '#1B9073',
                    500: '#048565',
                    600: '#04795C',
                    700: '#036D53',
                    800: '#036149',
                    900: '#035540',
                },
                sky: {
                    50: '#D7F3FC',
                    100: '#C5EEFB',
                    200: '#A8E5F8',
                    300: '#8BDDF6',
                    400: '#6ED4F4',
                    500: '#5fd0f3',
                    600: '#56BDDD',
                    700: '#4EAAC7',
                    800: '#4597B1',
                    900: '#3C849B',
                },
                yellow: {
                    50: '#FDF1D0',
                    100: '#FCECC0',
                    200: '#FBE3A1',
                    300: '#F9DA82',
                    400: '#F8D163',
                    500: '#F7CC53',
                    600: '#E1B94B',
                    700: '#CAA744',
                    800: '#B4943C',
                    900: '#9D8235',
                },
                zinc: {
                    50: '#D7D8D9',
                    100: '#D2D4D4',
                    200: '#C8CACB',
                    300: '#A3A6A8',
                    400: '#7E8385',
                    500: '#595F62',
                    600: '#464E50',
                    700: '#343c3f',
                    800: '#2E3538',
                    900: '#2A3033',
                },
                neutral: {
                    50: '#D9DADC',
                    100: '#D0D2D4',
                    200: '#C6C8CB',
                    300: '#8D9197',
                    400: '#7A7E85',
                    500: '#545A63',
                    600: '#414751',
                    700: '#2e3540',
                    800: '#292f39',
                    900: '#252B34',
                },
                
            },
        },    
        container: {
            padding: '2rem',
        },
    },
    
    


    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({ addBase, theme }) {
            addBase({
                'h1': { fontSize: theme('fontSize.4xl'), fontWeight: theme('fontWeight.semibold'), fontFamily: theme('fontFamily.primary') },
                'h2': { fontSize: theme('fontSize.3xl'), fontWeight: theme('fontWeight.semibold'), fontFamily: theme('fontFamily.primary') },
                'h3': { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.semibold'), fontFamily: theme('fontFamily.primary') },
                'h4': { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.semibold'), fontFamily: theme('fontFamily.primary') },
                'h5': { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.semibold'), fontFamily: theme('fontFamily.primary') },
                'h6': { fontSize: theme('fontSize.base'), fontWeight: theme('fontWeight.semibold'), fontFamily: theme('fontFamily.primary') },
            })
        }),
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.btn': {
                    padding: '10px 20px',
                    borderRadius: '0.25rem',
                    fontWeight: theme('fontWeight.normal'),
                    fontSize: '15px',
                    display: 'inline-block',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    textAlign: 'center',
                    transition: 'all 0.5s ease',
                },
                
            })
        })
    ],
}