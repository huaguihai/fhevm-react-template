import dynamic from 'next/dynamic'
import { WalletConnect } from '@/components/WalletConnect'

// Dynamically import EncryptDemo to avoid SSR issues with FHEVM
const EncryptDemo = dynamic(
  () => import('@/components/EncryptDemo').then((mod) => ({ default: mod.EncryptDemo })),
  {
    ssr: false,
    loading: () => (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Universal FHEVM SDK
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Build confidential dApps with ease
              </p>
            </div>
            <WalletConnect />
          </div>
        </header>

        {/* Hero Section */}
        <section className="card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to FHEVM Demo
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This demo showcases the Universal FHEVM SDK, a framework-agnostic toolkit for
            building privacy-preserving decentralized applications using Fully Homomorphic
            Encryption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
              <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                🔒 Fully Encrypted
              </h3>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                Compute on encrypted data without revealing the plaintext
              </p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
              <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                ⚡ Type-Safe
              </h3>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                Full TypeScript support with comprehensive type definitions
              </p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
              <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                🎯 Easy to Use
              </h3>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                Intuitive API inspired by wagmi for web3 developers
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="card">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Features
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Framework-agnostic core with React, Vue, and Vanilla adapters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Support for all FHEVM encryption types (bool, uint8-256)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Built-in caching and request deduplication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>TanStack Query integration for optimal performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Comprehensive error handling and validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Production-ready with tree-shaking support</span>
              </li>
            </ul>
          </section>

          <section className="card">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Quick Start
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  1. Install
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                  <code>npm install @universal-fhevm/react</code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. Configure
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                  <code>{`const config = createConfig({
  chainId: 8009,
  networkUrl: '...',
  gatewayUrl: '...',
  aclAddress: '...'
})`}</code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. Use Hooks
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                  <code>{`const { encrypt } = useEncrypt()
await encrypt({ value: 100, type: 'uint64' })`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>

        {/* Demo Section */}
        <section>
          <EncryptDemo />
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Built with ❤️ for the FHEVM community
          </p>
          <p>
            Universal FHEVM SDK - A framework-agnostic toolkit for confidential dApps
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://github.com/your-repo/universal-fhevm-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://docs.zama.ai/fhevm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              FHEVM Docs
            </a>
            <span>•</span>
            <a
              href="https://www.zama.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Zama.ai
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}
