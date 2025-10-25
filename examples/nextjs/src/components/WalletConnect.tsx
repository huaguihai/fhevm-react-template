'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center justify-center gap-4">
        <div className="text-sm font-medium text-white/95 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button
          onClick={() => disconnect()}
          className="btn-secondary"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="btn-primary"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  )
}
