import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE = process.env.ORDINALSBOT_API_BASE;
const API_KEY = process.env.ORDINALSBOT_API_KEY;

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const ticker = searchParams.get('ticker');

    if (!address || !ticker) {
        return NextResponse.json({ error: 'Address and ticker are required' }, { status: 400 });
    }

    try {
        const resp = await axios.get(`${API_BASE}/opi/v1/brc20/get_current_balance_of_wallet`, {
            params: { address, ticker },
            headers: {
                'x-api-key': API_KEY,
            },
        });
        
        if (resp.data.error) throw new Error(resp.data.error.message);

        return NextResponse.json(resp.data.result[0]);
    } catch (error: any) {
        console.error('Error fetching BRC20 balance:', error.message);
        return NextResponse.json({ error: error.response?.data?.error || error.message || 'Failed to fetch BRC20 wallet balance' }, { status: error.response?.status ?? 500 });
    }
}
