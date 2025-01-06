import Link from 'next/link';

export default function Home() {
    const orderIds = [
        '39c9bdcf-6459-4509-b7a6-7138ac826378',
        '7d138fda-001c-4421-b1df-cbb5b8571d20',
        '8bb1d29e-171a-4a63-9b38-c5ee3e7fe2e1',
        '800fa3c4-7004-43e8-823e-928a2e5c30a0',
    ];

    return (
        <div className='min-h-screen text-white flex items-center justify-center'>
            <div className='text-center space-y-8'>
                <h1 className='text-5xl font-bold text-green-500'>Welcome to OrdinalsBot</h1>
                <p className='text-lg text-gray-900'>Explore the world of Bitcoin ordinals with ease. Track balances, view transactions, and more.</p>

                <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold text-yellow-400'>Track Your Orders:</h2>
                    <ul className='space-y-2'>
                        {orderIds.map((id) => (
                            <li key={id}>
                                <Link href={`/order/${id}`} className='px-6 py-3 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-500 inline-block'>
                                    Track Order: {id}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
