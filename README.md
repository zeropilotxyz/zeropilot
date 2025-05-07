# ZeroPilot

A Cross-Chain Wallet System using LayerZero V2, featuring Solana and EVM chain integration.

## Architecture

ZeroPilot is a monorepo containing:

- `solana-program/`: Solana smart contract using Anchor framework
- `evm-contracts/`: EVM-compatible smart contracts using Foundry
- `packages/`: Shared utilities and types (for future use)

### Solana Program

The Solana program implements a smart wallet/account abstraction using PDAs (Program Derived Addresses). It features:
- PDA-based wallet management
- Cross-chain action queue
- LayerZero V2 integration for cross-chain messaging

### EVM Contracts

The EVM contracts handle:
- LayerZero message reception
- Cross-chain action verification
- Action execution on EVM chains

## Setup

### Prerequisites

- Rust and Cargo
- Solana CLI
- Anchor Framework
- Foundry
- Node.js and npm (for future frontend)

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

## Development

### Solana Program

The Solana program is built using Anchor framework. Key features:
- PDA-based wallet management
- Cross-chain action queue
- Event emission for cross-chain actions

### EVM Contracts

The EVM contracts are built using Foundry. Features:
- LayerZero endpoint integration
- Cross-chain message verification
- Action execution

## License

MIT 