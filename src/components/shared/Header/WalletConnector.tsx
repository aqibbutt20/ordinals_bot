'use client';
import React, { useMemo } from 'react';
import { useLaserEyes, UNISAT, XVERSE, MAGIC_EDEN, ORANGE, XverseLogo, UnisatLogo, MagicEdenLogo, ProviderType } from '@omnisat/lasereyes';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import WalletProfile from './WalletProfile';

type connectorPropsType = {
    className?: string;
};

type walletType = {
    isEnabled: boolean;
    Logo?: React.FC<
        React.SVGProps<SVGSVGElement> & {
            size?: number;
            variant?: 'first' | 'second';
        }
    >;
    provider: ProviderType;
};

const WalletConnector: React.FC<connectorPropsType> = ({ className }) => {
    const { connect, hasMagicEden, hasOrange, hasXverse, hasUnisat, isConnecting, connected } = useLaserEyes();
    const wallets: Array<walletType> = useMemo(() => {
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

    const handleWalletConnect = async (provider: ProviderType) => {
        try {
            await connect(provider);
        } catch (error: any) {
            toast.error(error.message ?? 'Unable to connect wallet');
        }
    };

    return (
        <div className={className ?? ''}>
            {connected ? (
                <WalletProfile />
            ) : (
                <Dialog>
                    <DialogTrigger className='bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md'>ConnectWallet</DialogTrigger>
                    <DialogContent className='lg:w-1/4'>
                        <DialogHeader>
                            <DialogTitle>Connect Wallet</DialogTitle>
                            {!isConnecting
                                ? wallets.map((wallet, i) => (
                                      <button
                                          onClick={() => wallet.isEnabled && handleWalletConnect(wallet.provider)}
                                          key={i}
                                          className={`flex items-center justify-center px-4 py-2 rounded-md w-full border capitalize bg-black text-white ${
                                              wallet.isEnabled ? 'hover:bg-white hover:text-black' : 'opacity-70'
                                          }`}
                                      >
                                          {wallet.Logo ? <wallet.Logo size={24} className='me-4' /> : ''}
                                          {wallet.provider}
                                      </button>
                                  ))
                                : 'Connecting'}
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default WalletConnector;
