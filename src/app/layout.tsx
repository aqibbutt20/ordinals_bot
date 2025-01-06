import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import ContextWrapper from '@/components/ContextWrapper/Index';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'OrdinalsBot',
    description: 'OrdinalsBot test assesment',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ContextWrapper>
                    <ToastContainer autoClose={2000} />
                    <div className='container mx-auto'>{children}</div>
                </ContextWrapper>
            </body>
        </html>
    );
}
