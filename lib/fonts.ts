import { Inter, Roboto_Mono, Anton, Raleway } from 'next/font/google';

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
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