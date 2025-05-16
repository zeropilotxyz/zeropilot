import Image from "next/image";
import Link from "next/link";
import { BookOpen, Layers, Code2, Rocket, ArrowRight, Wallet, Zap, Globe, Lock, FileText } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 md:px-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <Image src="/logo/logo.png" alt="ZeroPilot Logo" width={56} height={56} className="animate-spin-slow" />
        </div>
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
          ZeroPilot
        </span>
        <BookOpen className="w-10 h-10 text-cyan-400 ml-2" />
        <h1 className="text-5xl font-extrabold text-white tracking-tight">Documentation</h1>
      </div>
      <p className="mb-12 text-xl text-cyan-100 max-w-2xl">
        ZeroPilot is a cross-chain wallet and protocol layer, enabling seamless asset management and swaps between Solana and EVM chains using LayerZero V2. It features a unified SDK for developers and a beautiful dashboard for users.
      </p>

      <div className="space-y-16">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-7 h-7 text-purple-400" />
            <h2 className="text-3xl font-bold text-cyan-300">How It Works</h2>
          </div>
          <ul className="list-none space-y-4 ml-0 text-gray-200">
            <li className="flex items-center gap-3"><Wallet className="w-5 h-5 text-cyan-400" /> Users connect a single wallet (Solana or EVM) and interact with all supported chains from one dashboard.</li>
            <li className="flex items-center gap-3"><Zap className="w-5 h-5 text-purple-400" /> Cross-chain swaps and actions are powered by LayerZero V2 messaging, ensuring secure and fast communication between chains.</li>
            <li className="flex items-center gap-3"><Globe className="w-5 h-5 text-cyan-400" /> Solana program manages wallet abstraction and action queue using PDAs. EVM contracts verify and execute cross-chain actions.</li>
            <li className="flex items-center gap-3"><Lock className="w-5 h-5 text-purple-400" /> The SDK abstracts all protocol logic for easy integration into any app.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-7 h-7 text-cyan-400" />
            <h2 className="text-3xl font-bold text-cyan-300">SDK Usage</h2>
          </div>
          <p className="mb-2 text-gray-200">The <span className="font-mono">zeropilot-sdk</span> provides a simple TypeScript interface for cross-chain wallet and swap operations:</p>
          <pre className="bg-gradient-to-r from-black/80 to-cyan-950/80 rounded-xl p-6 text-base text-cyan-200 overflow-x-auto mb-4 border border-cyan-900 shadow-lg"><code>{`import { ZeroPilotSDK } from 'zeropilot-sdk';

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
`}</code></pre>
          <p className="mb-8 text-gray-400">The SDK is currently a stub and will be upgraded to support real wallets, tokens, and chains as the protocol matures.</p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-7 h-7 text-purple-400" />
            <h2 className="text-3xl font-bold text-cyan-300">Future Considerations</h2>
          </div>
          <ul className="list-none space-y-4 ml-0 text-gray-200">
            <li className="flex items-center gap-3"><ArrowRight className="w-5 h-5 text-cyan-400" /> Adding support for more chains (Aptos, Sui, Cosmos, etc.)</li>
            <li className="flex items-center gap-3"><ArrowRight className="w-5 h-5 text-cyan-400" /> Optimizing gas usage and transaction batching</li>
            <li className="flex items-center gap-3"><ArrowRight className="w-5 h-5 text-cyan-400" /> Advanced security features and audits</li>
            <li className="flex items-center gap-3"><ArrowRight className="w-5 h-5 text-cyan-400" /> Native support for more tokens and NFTs</li>
            <li className="flex items-center gap-3"><ArrowRight className="w-5 h-5 text-cyan-400" /> Open-source SDK and developer documentation</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-cyan-400" />
            <h2 className="text-3xl font-bold text-cyan-300">Learn More</h2>
          </div>
          <p className="text-gray-300 text-lg">Check out the <Link href="/" className="text-purple-400 underline">landing page</Link> or the <a href="https://github.com/zeropilot" className="text-purple-400 underline" target="_blank" rel="noopener noreferrer">GitHub repo</a> for more details.</p>
        </section>
      </div>
    </div>
  );
} 