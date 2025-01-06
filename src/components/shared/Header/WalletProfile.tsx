import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLaserEyes } from '@omnisat/lasereyes';
import useBrc20Balance from '@/lib/hooks/useBrc20Balance';
import { TRIO_DECIMALS_FACTOR } from '@/lib/constants';

const sliceAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 5, address.length)}`;
};

const WalletProfile: React.FC = () => {
    const { address, getBalance, disconnect } = useLaserEyes();
    const { data, isLoading } = useBrc20Balance(address, 'trio');

    const [balance, setBalance] = useState(0);

    const setWalletBalance = async () => {
        const balance = await getBalance();
        if (balance) setBalance(Number(balance));
    };

    useEffect(() => {
        setWalletBalance();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md'>{sliceAddress(address)}</DropdownMenuTrigger>
            <DropdownMenuContent className='flex items-center flex-col'>
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
