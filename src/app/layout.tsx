import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import ContextWrapper from '@/components/ContextWrapper/Index';
import Header from '@/components/shared/Header/Index';
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
    description: 'OrdinalsBot test assessment',
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
                    {/* Provide global context using ContextWrapper */}
                    <ToastContainer autoClose={2000} />
                    <Header />
                    <div className='container mx-auto'>
                        {children}
                    </div>
                </ContextWrapper>
            </body>
        </html>
    );
}
