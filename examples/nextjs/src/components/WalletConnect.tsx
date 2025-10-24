'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
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
    <div className="flex gap-2">
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
