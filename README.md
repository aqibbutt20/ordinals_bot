# OrdinalsBot Frontend Project

This project is a frontend application built with **Next.js** (App Router) and **TypeScript** for interacting with the **OrdinalsBot API** and **Blockchain**. It displays user-specific order details, token balances, and provides insights into current Bitcoin-related data.

## Key Features
- **Dynamic Order Details Page:** View relevant information for specific orders.
- **BRC-20 Token Balance Display:** Fetch and display token balances.
- **Current BTC Block & Price:** Display current data.
- **API Integration:** Seamless interaction with backend APIs.
- **Wallet Connection Support:** Ability to connect user wallets using Lasereyes for personalized experience.
  - **Wallet Existance:** Ability to detect installed wallets available to connect.

## Project Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ordinals_bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file and add necessary variables as in `example.env`.

4. Run the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### BRC-20 Token Balance API
- **Endpoint:** `/api/brc20Balance`
- **Method:** `GET`
- **Query Parameters:**
  - `address` (string, required): Wallet address to fetch the balance.
  - `ticker` (string, required): Brc20 ticker.
- **Response Example:**
  ```json
  {
    "overall_balance": "123",
    "available_balance": "123",
    "block_height": 878084,
    "tick": "trio"
  }
  ```
- **Error Response Example:**
  ```json
  {
    "error": "Address and ticker are required"
  }
  ```

## Pages Routes
- `/`: Home Page
- `/order/[id]`: Dynamic route to display order details.

## API Integration Documentation
Refer to [OrdinalsBot API Docs](https://docs.ordinalsbot.com).


Built with ❤️