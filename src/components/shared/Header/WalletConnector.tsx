'use client';

import React, { useMemo } from 'react';
import { useLaserEyes, UNISAT, XVERSE, MAGIC_EDEN, ORANGE, XverseLogo, UnisatLogo, MagicEdenLogo, ProviderType } from '@omnisat/lasereyes';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import WalletProfile from './WalletProfile';

type ConnectorPropsType = {
    className?: string;
};

type RenderWalletConnectType = {
    connected: boolean;
    isConnecting: boolean;
    handleWalletConnect: (provider: ProviderType) => void;
    wallets: Array<WalletType>;
};

type WalletType = {
    isEnabled: boolean;
    Logo?: React.FC<
        React.SVGProps<SVGSVGElement> & {
            size?: number;
            variant?: 'first' | 'second';
        }
    >;
    provider: ProviderType;
};

/**
 * Renders the wallet connect dialog or profile based on connection status.
 *
 * @param connected - Indicates if a wallet is connected.
 * @param isConnecting - Indicates if a wallet is in the process of connecting.
 * @param handleWalletConnect - Function to handle wallet connection.
 * @param wallets - Array of wallet options to render.
 */
const RenderWalletConnect: React.FC<RenderWalletConnectType> = ({ connected, isConnecting, handleWalletConnect, wallets }) => {
    if (connected) {
        // Render the wallet profile if a wallet is connected
        return <WalletProfile />;
    }

    return (
        <Dialog>
            <DialogTrigger className='bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md'>Connect Wallet</DialogTrigger>
            <DialogContent className='lg:w-1/4'>
                <DialogHeader>
                    <DialogTitle>Connect Wallet</DialogTitle>
                    {!isConnecting ? (
                        wallets.map((wallet, i) => (
                            <button
                                onClick={() => wallet.isEnabled && handleWalletConnect(wallet.provider)}
                                key={i}
                                className={`flex items-center justify-center px-4 py-2 rounded-md w-full border capitalize bg-black text-white ${
                                    wallet.isEnabled ? 'hover:bg-white hover:text-black' : 'opacity-70'
                                }`}
                            >
                                {wallet.Logo ? <wallet.Logo size={24} className='me-4' /> : null}
                                {wallet.provider}
                            </button>
                        ))
                    ) : (
                        <div className='text-center'>Connecting...</div>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

const WalletConnector: React.FC<ConnectorPropsType> = ({ className }) => {
    const { connect, hasMagicEden, hasOrange, hasXverse, hasUnisat, isConnecting, connected } = useLaserEyes();

    const wallets: Array<WalletType> = useMemo(() => {
        return [
            {
                isEnabled: hasXverse,
                Logo: XverseLogo,
                provider: XVERSE,
            },
            {
                isEnabled: hasUnisat,
                Logo: UnisatLogo,
                provider: UNISAT,
            },
            {
                isEnabled: hasMagicEden,
                Logo: MagicEdenLogo,
                provider: MAGIC_EDEN,
            },
            {
                isEnabled: hasOrange,
                provider: ORANGE,
            },
        ];
    }, [hasXverse, hasMagicEden, hasUnisat, hasOrange]);

    /**
     * Handles wallet connection with error handling.
     *
     * @param provider - The wallet provider to connect to.
     */
    const handleWalletConnect = async (provider: ProviderType) => {
        try {
            await connect(provider);
            toast.success(`Connected to ${provider}`);
        } catch (error: any) {
            toast.error(error.message ?? 'Unable to connect wallet');
        }
    };

    return (
        <div className={className ?? ''}>
            {<RenderWalletConnect connected={connected} isConnecting={isConnecting} handleWalletConnect={handleWalletConnect} wallets={wallets} />}
        </div>
    );
};

export default WalletConnector;
