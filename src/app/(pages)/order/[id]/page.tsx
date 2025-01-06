import { NextPage } from 'next';
import React from 'react';

const API_BASE = process.env.ORDINALSBOT_API_BASE;
const API_KEY = process.env.ORDINALSBOT_API_KEY;

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

/**
 * Page Component
 * Fetches and displays order details using the provided order ID (SSR).
 */
const Page: NextPage<PageProps> = async ({ params }) => {
    const { id } = await params;

    let orderData: any;
    let errorMessage = '';

    try {
        // Fetch order details from the OrdinalsBot API
        const res = await fetch(`${API_BASE}/order?id=${id}`, {
            headers: {
                'x-api-key': API_KEY ?? '',
            },
            cache: 'no-store',
        });

        // Throw an error if the API response is not successful
        if (!res.ok) {
            throw new Error(`Failed to fetch order. HTTP status: ${res.status}`);
        }

        orderData = await res.json();

        // Check if the API returned an error in the response
        if (orderData.status === 'error') {
            throw new Error(orderData.error || 'Invalid order data received from the API.');
        }
    } catch (error: any) {
        console.error('Error fetching order details:', error.message);

        errorMessage = error.message;
    }

    // If an error occurred, render an error page
    if (errorMessage) {
        return (
            <div className='min-h-screen text-white flex items-center justify-center p-8'>
                <div className='max-w-md w-full bg-gray-800 p-6 rounded-md shadow-lg'>
                    <h1 className='text-3xl font-bold text-red-500 text-center mb-4'>Error</h1>
                    <p className='text-lg text-gray-300 text-center break-all'>{errorMessage}</p>
                </div>
            </div>
        );
    }

    // Render the order details if the data is successfully fetched
    return (
        <div className='min-h-screen text-white flex items-center justify-center p-8'>
            <div className='max-w-4xl w-full bg-gray-800 p-8 rounded-md shadow-lg break-all'>
                <h1 className='text-3xl font-bold text-yellow-400 text-center mb-6'>Order Details</h1>

                <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold text-green-400'>General Information</h2>
                    <p>
                        <strong>Order ID:</strong> {orderData.id}
                    </p>
                    <p>
                        <strong>Status:</strong> {orderData.status}
                    </p>
                    <p>
                        <strong>Created At:</strong> {new Date(orderData.createdAt).toLocaleString()}
                    </p>

                    <h2 className='text-2xl font-semibold text-green-400 mt-6'>Payment Details</h2>
                    <p>
                        <strong>Amount:</strong> {orderData.charge.amount} Sats
                    </p>
                    <p>
                        <strong>Fiat Value:</strong> ${orderData.charge.fiat_value}
                    </p>
                    <p>
                        <strong>Service Fee:</strong> {orderData.serviceFee} Sats
                    </p>
                    <p>
                        <strong>Chain Fee:</strong> {orderData.chainFee} Sats
                    </p>

                    {orderData.refund && (
                        <>
                            <h2 className='text-2xl font-semibold text-green-400 mt-6'>Refund Details</h2>
                            <p>
                                <strong>Refund Address:</strong> {orderData.refund.address}
                            </p>
                            <p>
                                <strong>Refund Amount:</strong> {orderData.refund.amount} Sats
                            </p>
                            <p>
                                <strong>Refund Transaction ID:</strong> {orderData.refund.txid}
                            </p>
                        </>
                    )}

                    <h2 className='text-2xl font-semibold text-green-400 mt-6'>Files</h2>
                    {orderData.files && orderData.files.length > 0 ? (
                        <ul className='space-y-2'>
                            {orderData.files.map((file: any, index: number) => (
                                <li key={index} className='bg-gray-700 p-4 rounded-md'>
                                    <p>
                                        <strong>File Name:</strong> {file.name}
                                    </p>
                                    <p>
                                        <strong>File Size:</strong> {file.size} bytes
                                    </p>
                                    <p>
                                        <strong>File Type:</strong> {file.type}
                                    </p>
                                    <p>
                                        <strong>File URL:</strong>{' '}
                                        <a href={file.url} target='_blank' rel='noopener noreferrer' className='text-yellow-400 underline'>
                                            View File
                                        </a>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No files available for this order.</p>
                    )}

                    <h2 className='text-2xl font-semibold text-green-400 mt-6'>Additional Information</h2>
                    <p>
                        <strong>Description:</strong> {orderData.charge.description}
                    </p>
                    <p>
                        <strong>Hosted Checkout URL:</strong>{' '}
                        <a href={orderData.charge.hosted_checkout_url} target='_blank' rel='noopener noreferrer' className='text-yellow-400 underline'>
                            View Checkout
                        </a>
                    </p>
                    <p>
                        <strong>Receive Address:</strong> {orderData.receiveAddress}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
