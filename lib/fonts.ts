import { Inter, Roboto_Mono, Anton, Raleway } from 'next/font/google';
import localFont from 'next/font/local'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const anton = Anton({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-anton',
});

export const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-raleway',
});

export const ivyPresto = localFont({
    src: [
        { path: '../app/fonts/Ivy-Presto-Display-Thin.otf', weight: '100', style: 'normal' },
        { path: '../app/fonts/Ivy-Presto-Display-Light.otf', weight: '300', style: 'normal' },
        { path: '../app/fonts/Ivy-Presto-Display-Semi-Bold.otf', weight: '600', style: 'normal' },
    ],
    variable: '--font-ivy-presto',
});

export const ivyOra = localFont({
    src: [
        { path: '../app/fonts/Ivy-Ora-Display-Thin.otf', weight: '100' },
        { path: '../app/fonts/Ivy-Ora-Display-Light.otf', weight: '300' },
        { path: '../app/fonts/Ivy-Ora-Display.otf', weight: '400' },
    ],
    variable: '--font-ivy-ora',
});