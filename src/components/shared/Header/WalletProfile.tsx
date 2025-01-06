import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLaserEyes } from '@omnisat/lasereyes';

const sliceAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 5, address.length)}`;
};

const WalletProfile: React.FC = () => {
    const { address, getBalance, disconnect } = useLaserEyes();

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
