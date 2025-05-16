// ZeroPilot SDK - TypeScript stubs for cross-chain single wallet experience

export type Chain = 'solana' | 'evm';

export interface WalletInfo {
  address: string;
  chain: Chain;
}

export interface SwapParams {
  fromChain: Chain;
  toChain: Chain;
  fromAddress: string;
  toAddress: string;
  amount: string;
  token: string;
}

export interface SwapStatus {
  status: 'initiated' | 'signing' | 'layerzero' | 'settling' | 'completed' | 'failed';
  txHash?: string;
  message?: string;
}

export class ZeroPilotSDK {
  constructor(public config?: Record<string, any>) {}

  /**
   * Connect to a wallet on a given chain (stub)
   */
  async connectWallet(chain: Chain): Promise<WalletInfo> {
    // TODO: Integrate with real wallet providers
    return {
      address: 'mock-address-' + chain,
      chain,
    };
  }

  /**
   * Get balance for a wallet (stub)
   */
  async getBalance(address: string, chain: Chain, token: string): Promise<string> {
    // TODO: Replace with real chain queries
    return '100.00';
  }

  /**
   * Initiate a cross-chain swap (stub)
   */
  async swap(params: SwapParams, onStatus?: (status: SwapStatus) => void): Promise<SwapStatus> {
    // TODO: Implement real cross-chain swap logic
    if (onStatus) onStatus({ status: 'initiated' });
    await new Promise(r => setTimeout(r, 1000));
    if (onStatus) onStatus({ status: 'signing' });
    await new Promise(r => setTimeout(r, 1000));
    if (onStatus) onStatus({ status: 'layerzero' });
    await new Promise(r => setTimeout(r, 2000));
    if (onStatus) onStatus({ status: 'settling' });
    await new Promise(r => setTimeout(r, 1000));
    if (onStatus) onStatus({ status: 'completed', txHash: 'mock-tx-hash' });
    return { status: 'completed', txHash: 'mock-tx-hash' };
  }
} 