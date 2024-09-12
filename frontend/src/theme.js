// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '##13100c', // Customize your primary color
        },
        secondary: {
            main: '#dc004e', // Customize your secondary color
        },
        background: {
            default: '#000', // Set default background color for the entire app
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        // Customize default styles for specific components
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#b0cace', // Apply primary color to Paper component
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#bb8587',
                    fontFamily: 'Trispace',
                    border: "1px #f6fafa solid"
                },
            },
        },
        // Add more components here as needed
    },
});

export default theme;
