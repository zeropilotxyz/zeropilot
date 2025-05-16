# ZeroPilot

A Cross-Chain Wallet System using LayerZero V2, featuring Solana and EVM chain integration, and a TypeScript SDK for cross-chain single wallet experience.

## Monorepo Structure

- `frontend/`: Next.js app for the ZeroPilot dashboard and user interface
- `solana-program/`: Solana smart contract using Anchor framework
- `evm-contracts/`: EVM-compatible smart contracts using Foundry
- `packages/zeropilot-sdk/`: TypeScript SDK for cross-chain wallet and swap experience (stubs for now)
- `packages/`: Shared utilities and types (for future use)

---

### Frontend

- Built with Next.js, TailwindCSS, and TypeScript
- Features a mock wallet, cross-chain swap UI, and status simulation
- Integrates with the SDK for future real cross-chain actions

### Solana Program

- Built using Anchor framework
- PDA-based wallet management
- Cross-chain action queue
- LayerZero V2 integration for cross-chain messaging

### EVM Contracts

- Built using Foundry
- LayerZero message reception
- Cross-chain action verification
- Action execution on EVM chains

### ZeroPilot SDK (`packages/zeropilot-sdk`)

- TypeScript SDK for cross-chain single wallet experience
- Provides stubs for:
  - Connecting to wallets on Solana/EVM
  - Getting balances
  - Initiating cross-chain swaps (with status callback)
- Designed for easy integration into the frontend or other apps
- Ready for real implementation as protocol matures

#### Example Usage
```ts
import { ZeroPilotSDK } from 'zeropilot-sdk';

const sdk = new ZeroPilotSDK();
const wallet = await sdk.connectWallet('solana');
const balance = await sdk.getBalance(wallet.address, 'solana', 'SOL');
const status = await sdk.swap({
  fromChain: 'solana',
  toChain: 'evm',
  fromAddress: wallet.address,
  toAddress: '0x...',
  amount: '1.0',
  token: 'SOL',
}, (status) => console.log(status));
```

---

## Setup

### Prerequisites

- Rust and Cargo
- Solana CLI
- Anchor Framework
- Foundry
- Node.js and npm (for frontend and SDK)

### Building

1. Solana Program:
```bash
cd solana-program
anchor build
```

2. EVM Contracts:
```bash
cd evm-contracts
forge build
```

3. SDK:
```bash
cd packages/zeropilot-sdk
npm install
npm run build
```

4. Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## License

MIT 