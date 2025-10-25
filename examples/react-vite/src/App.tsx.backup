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
                <h3>🔒 Framework Agnostic</h3>
                <p>Works with React, Vue, and vanilla JavaScript</p>
              </div>
              <div className="feature-card">
                <h3>⚡ Type Safe</h3>
                <p>Full TypeScript support with strict typing</p>
              </div>
              <div className="feature-card">
                <h3>🎯 wagmi-like API</h3>
                <p>Familiar patterns for web3 developers</p>
              </div>
              <div className="feature-card">
                <h3>🔐 Full Encryption</h3>
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
