
'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
    direction: 'rtl',
});

export default function ThemeRegistry({ children, theme }: { children: React.ReactNode; theme: any; }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

