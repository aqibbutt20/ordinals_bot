'use client';
import React, { ReactNode } from 'react';
import { LaserEyesProvider, MAINNET, SIGNET } from '@omnisat/lasereyes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';

const Index: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const queryClient = new QueryClient();
    return (
        <LaserEyesProvider
            config={{
                network: process.env.NEXT_PUBLIC_BTC_NETWORK?.toLowerCase() == 'signet' ? SIGNET : MAINNET,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </QueryClientProvider>
        </LaserEyesProvider>
    );
};

export default Index;
