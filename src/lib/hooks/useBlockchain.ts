import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://blockchain.info/q',
});

const fetchBlockHeightAndPrice = async () => {
    try {
        const blockHeightResponse = await axiosInstance.get('/getblockcount');
        const blockHeight = blockHeightResponse.data;

        const priceResponse = await axiosInstance.get('/24hrprice');
        const price = priceResponse.data;

        return { blockHeight, price };
    } catch (error: any) {
        console.error('Error in fetchBlockHeightAndPrice with Axios:', error.message);
        throw new Error('Failed to fetch block height and price.');
    }
};

const useBlockchain = () => {
    return useQuery({
        queryKey: ['blockHeightAndPrice'],
        queryFn: fetchBlockHeightAndPrice,
        staleTime: 60 * 1000,
        refetchInterval: 60 * 1000,
        select: (data) => ({
            blockHeight: data.blockHeight ?? 0,
            price: data.price ?? 0,
        }),
    });
};

export default useBlockchain;
