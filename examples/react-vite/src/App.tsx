import { Providers } from './components/Providers'
import { WalletConnect } from './components/WalletConnect'
import { EncryptDemo } from './components/EncryptDemo'
import './App.css'

function App() {
  return (
    <Providers>
      <div className="app">
        <header className="app-header">
          <h1>Universal FHEVM SDK</h1>
          <p className="subtitle">Confidential Smart Contracts Made Simple</p>
        </header>

        <main className="app-main">
          <section className="section">
            <WalletConnect />
          </section>

          <section className="section">
            <EncryptDemo />
          </section>

          <section className="section features">
            <h2>SDK Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3>Framework Agnostic</h3>
                <p>Works with React, Vue, and vanilla JavaScript</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <h3>Type Safe</h3>
                <p>Full TypeScript support with strict typing</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3>wagmi-like API</h3>
                <p>Familiar patterns for web3 developers</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </div>
                <h3>Full Encryption</h3>
                <p>Support for all FHEVM data types</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="app-footer">
          <p>
            Powered by{' '}
            <a href="https://www.zama.ai/" target="_blank" rel="noopener noreferrer">
              Zama FHEVM
            </a>
          </p>
        </footer>
      </div>
    </Providers>
  )
}

export default App
