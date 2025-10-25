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
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <main className="min-h-screen p-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header with animation */}
        <header className="text-center mb-16 animate-[fadeInDown_0.8s_ease-out]">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent animate-[titleGlow_3s_ease-in-out_infinite_alternate]">
            Universal FHEVM SDK
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide">
            Confidential Smart Contracts Made Simple
          </p>
        </header>

        <div className="space-y-8">
          {/* Wallet Connection Card */}
          <section className="card" style={{ animationDelay: '0.1s' }}>
            <WalletConnect />
          </section>

          {/* Encrypt Demo Card */}
          <section className="card" style={{ animationDelay: '0.2s' }}>
            <EncryptDemo />
          </section>

          {/* Features Card */}
          <section className="card" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              SDK Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature Card 1 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Framework Agnostic</h3>
                <p className="text-white/90 text-center">Works with React, Vue, and vanilla JavaScript</p>
              </div>

              {/* Feature Card 2 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Type Safe</h3>
                <p className="text-white/90 text-center">Full TypeScript support with strict typing</p>
              </div>

              {/* Feature Card 3 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">wagmi-like API</h3>
                <p className="text-white/90 text-center">Familiar patterns for web3 developers</p>
              </div>

              {/* Feature Card 4 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Full Encryption</h3>
                <p className="text-white/90 text-center">Support for all FHEVM data types</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 pt-12 border-t border-white/10 text-white/85 animate-[fadeIn_1s_ease-out_0.5s_backwards]">
          <p className="mb-2">
            Powered by{' '}
            <a
              href="https://www.zama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b9afd] hover:text-[#a085d1] transition-colors relative"
            >
              Zama FHEVM
            </a>
          </p>
          <p className="text-sm text-white/70">
            Building the future of confidential smart contracts
          </p>
        </footer>
      </div>
    </main>
  )
}
