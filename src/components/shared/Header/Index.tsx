'use client';

import { useEffect } from 'react';
import WalletConnector from './WalletConnector';
import useBlockchain from '@/lib/hooks/useBlockchain';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Header = () => {
    const { data, isLoading, isError, error } = useBlockchain();
    useEffect(() => {
        if (isError && error) {
            toast.error(error.message);
        }
    }, [isError, error]);

    return (
        <header className='bg-gray-900 text-white shadow-md sticky top-0 w-full'>
            <div className='container mx-auto flex justify-between items-center p-4'>
                <Link href={'/'} className='text-2xl font-bold text-yellow-400'>OrdinalsBot</Link>

                {!isLoading && (
                    <div className='hidden md:flex space-x-6'>
                        <div className='text-sm'>
                            <span className='font-medium'>Current Block:</span> #{data?.blockHeight}
                        </div>
                        <div className='text-sm'>
                            <span className='font-medium'>BTC Price:</span> ${data?.price}
                        </div>
                    </div>
                )}

                <WalletConnector />
            </div>

            <div className='md:hidden bg-gray-800 text-center p-2 text-sm space-y-1'>
                <div>
                    <span className='font-medium'>Current Block:</span> #{data?.blockHeight}
                </div>
                <div>
                    <span className='font-medium'>BTC Price:</span> ${data?.price}
                </div>
            </div>
        </header>
    );
};

export default Header;
