import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Environment variables for API base URL and API key
const API_BASE = process.env.ORDINALSBOT_API_BASE;
const API_KEY = process.env.ORDINALSBOT_API_KEY;

/**
 * GET handler for fetching the current balance of a BRC20 wallet.
 *
 * @param request - The incoming request object containing query parameters.
 * @returns JSON response containing the wallet balance or an error message.
 */
export async function GET(request: NextRequest) {
    // Extract query parameters (address and ticker) from the request URL
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const ticker = searchParams.get('ticker');

    // Validate required query parameters
    if (!address || !ticker) {
        return NextResponse.json({ error: 'Address and ticker are required' }, { status: 400 });
    }

    try {
        // Make a GET request to the OrdinalsBot API to fetch wallet balance
        const resp = await axios.get(`${API_BASE}/opi/v1/brc20/get_current_balance_of_wallet`, {
            params: { address, ticker },
            headers: {
                'x-api-key': API_KEY,
            },
        });

        // Check if the API response contains an error and throw an exception if true
        if (resp.data.error) throw new Error(resp.data.error.message);

        // Return the result (balance details) from the API response
        return NextResponse.json(resp.data.result[0]);
    } catch (error: any) {
        console.error('Error fetching BRC20 balance:', error.message);

        // Return a JSON response with the error message and appropriate status code
        return NextResponse.json(
            {
                error: error.response?.data?.error || error.message || 'Failed to fetch BRC20 wallet balance', // Default error message
            },
            { status: error.response?.status ?? 500 },
        );
    }
}
