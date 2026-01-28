"use client";

import { createTheme } from '@mui/material/styles';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    display: 'swap',
});

export const theme = createTheme({
    typography: {
        fontFamily: outfit.style.fontFamily,
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF5350', // Soft red
        },
        secondary: {
            main: '#3B4CCA', // Pokemon Blue
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});
