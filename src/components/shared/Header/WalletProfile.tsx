import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLaserEyes } from '@omnisat/lasereyes';
import useBrc20Balance from '@/lib/hooks/useBrc20Balance';
import { TRIO_DECIMALS_FACTOR } from '@/lib/constants';
import { sliceAddress } from '@/lib/helpers/addressSliceHelper';

/**
 * WalletProfile Component
 * Displays wallet information, balance details, and logout option for the connected wallet.
 */
const WalletProfile: React.FC = () => {
    const { address, getBalance, disconnect } = useLaserEyes();
    const { data, isLoading } = useBrc20Balance(address, 'trio'); // Fetch BRC20 (Trio) balance using a custom hook

    const [balance, setBalance] = useState(0);

    /**
     * Fetches and sets the wallet's overall balance (sats).
     */
    const setWalletBalance = async () => {
        try {
            const walletBalance = await getBalance();
            if (walletBalance) setBalance(Number(walletBalance));
        } catch (error: any) {
            console.error('Error fetching wallet balance:', error);
        }
    };

    // Fetch wallet balance on initial component load
    useEffect(() => {
        setWalletBalance();
    }, []);

    return (
        <DropdownMenu>
            {/* Trigger Dropdown to display wallet profile */}
            <DropdownMenuTrigger className='bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md'>{sliceAddress(address)}</DropdownMenuTrigger>

            <DropdownMenuContent className='flex items-center flex-col'>
                {/* Tooltip to show the full wallet address on hover */}
                <Tooltip>
                    <TooltipTrigger>{sliceAddress(address)}</TooltipTrigger>
                    <TooltipContent>
                        <p>{address}</p>
                    </TooltipContent>
                </Tooltip>

                <hr />

                <DropdownMenuLabel>Balance: {balance} sats</DropdownMenuLabel>

                {!isLoading && (
                    <div className='flex flex-col items-center border border-x-0 my-2 w-full'>
                        <span className='font-bold'>Trio Balance</span>
                        <div>
                            <div>Confirmed: {Number(data?.available_balance ?? 0) / 10 ** TRIO_DECIMALS_FACTOR}</div>
                            <div>Total: {Number(data?.overall_balance ?? 0) / 10 ** TRIO_DECIMALS_FACTOR}</div>
                        </div>
                    </div>
                )}

                {/* Logout button */}
                <div className='w-full flex justify-center'>
                    <button className='rounded-md bg-gray-900 text-white py-2 px-4' onClick={disconnect}>
                        Logout?
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WalletProfile;
