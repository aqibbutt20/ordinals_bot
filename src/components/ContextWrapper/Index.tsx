'use client';
import React, { ReactNode } from 'react';
import { LaserEyesProvider, MAINNET, SIGNET } from '@omnisat/lasereyes';

const Index: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    return (
        <LaserEyesProvider
            config={{
                network: process.env.NEXT_PUBLIC_BTC_NETWORK?.toLowerCase() == 'signet' ? SIGNET : MAINNET,
            }}
        >
            {children}
        </LaserEyesProvider>
    );
};

export default Index;
