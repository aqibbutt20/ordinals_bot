import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * fetchBrc20Balance
 * Fetches the BRC20 balance for a given Bitcoin address and token ticker from the API.
 * 
 * @param {string} address - Bitcoin wallet address to check the balance.
 * @param {string} ticker - BRC20 token ticker to fetch the balance for.
 * @returns {Promise<any>} - Returns the balance data from the API.
 * @throws Throws an error if the API call fails or if required parameters are missing.
 */
const fetchBrc20Balance = async (address: string, ticker: string) => {
    // Validate required parameters
    if (!address || !ticker) {
        throw new Error('Address and ticker are required');
    }

    try {
        // Make an API call to fetch BRC20 balance
        const response = await axios.get('/api/brc20Balance', {
            params: { address, ticker },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching BRC20 balance:', error.message);

        // Throw a generic error message for the React Query error handling
        throw new Error('Failed to fetch BRC20 wallet balance');
    }
};

/**
 * useBrc20Balance
 * Custom React Query hook to fetch and manage the BRC20 balance data.
 * 
 * @param {string} address - Bitcoin wallet address to check the balance.
 * @param {string} ticker - BRC20 token ticker to fetch the balance for.
 * @returns Query result object containing data, status, and utility functions.
 */
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
