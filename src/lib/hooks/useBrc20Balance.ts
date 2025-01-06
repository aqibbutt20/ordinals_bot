import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBrc20Balance = async (address: string, ticker: string) => {
    if (!address || !ticker) {
        throw new Error('Address and ticker are required');
    }

    try {
        const response = await axios.get('/api/brc20Balance', {
            params: { address, ticker },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching BRC20 balance:', error.message);
        throw new Error('Failed to fetch BRC20 wallet balance');
    }
};

const useBrc20Balance = (address: string, ticker: string) => {
    return useQuery({
        queryKey: ['brc20Balance', address, ticker],
        queryFn: () => fetchBrc20Balance(address, ticker),
        enabled: !!address && !!ticker,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
};

export default useBrc20Balance;
