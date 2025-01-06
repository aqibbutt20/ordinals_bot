import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Create an Axios instance with a predefined base URL for blockchain.info API
const axiosInstance = axios.create({
    baseURL: 'https://blockchain.info/q',
});

/**
 * fetchBlockHeightAndPrice
 * Fetches the current block height and Bitcoin price from blockchain.info.
 * 
 * @returns An object containing the block height and price.
 * @throws Throws an error if the API calls fail.
 */
const fetchBlockHeightAndPrice = async () => {
    try {
        // Fetch the current block height
        const blockHeightResponse = await axiosInstance.get('/getblockcount');
        const blockHeight = blockHeightResponse.data;

        // Fetch the 24-hour average Bitcoin price
        const priceResponse = await axiosInstance.get('/24hrprice');
        const price = priceResponse.data;

        // Return the combined result
        return { blockHeight, price };
    } catch (error: any) {
        console.error('Error in fetchBlockHeightAndPrice with Axios:', error.message);

        // Throw a generic error message for the React Query error handling
        throw new Error('Failed to fetch block height and price.');
    }
};

/**
 * useBlockchain
 * Custom React Query hook to fetch and manage the block height and Bitcoin price data.
 * 
 * @returns Query result object containing data, status, and utility functions.
 */
const useBlockchain = () => {
    return useQuery({
        queryKey: ['blockHeightAndPrice'],
        queryFn: fetchBlockHeightAndPrice,
        staleTime: 60 * 1000, // Data is considered fresh for 1 minute
        refetchInterval: 60 * 1000, // Refetch data every 1 minute
        select: (data) => ({
            blockHeight: data.blockHeight ?? 0,
            price: data.price ?? 0,
        }),
    });
};

export default useBlockchain;
