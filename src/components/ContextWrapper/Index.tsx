'use client';

import React, { ReactNode } from 'react';
import { LaserEyesProvider, MAINNET, SIGNET } from '@omnisat/lasereyes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';

/**
 * Index Component
 * Wraps the application with necessary providers for LaserEyes, React Query, and Tooltip functionality.
 *
 * @param {ReactNode} children - The child components to be rendered within the providers.
 */
const Index: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        // Provides LaserEyes context for Bitcoin network operations
        <LaserEyesProvider
            config={{
                // Dynamically set the network based on the environment variable (MAINNET or SIGNET)
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
