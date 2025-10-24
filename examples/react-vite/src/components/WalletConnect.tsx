import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <span className="wallet-label">Connected:</span>
          <span className="wallet-address">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button onClick={() => disconnect()} className="btn btn-secondary">
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-connect">
      <h3>Connect Your Wallet</h3>
      <div className="connectors">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            className="btn btn-primary"
          >
            Connect with {connector.name}
          </button>
        ))}
      </div>
    </div>
  )
}
