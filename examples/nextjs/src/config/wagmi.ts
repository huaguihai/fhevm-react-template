import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

// Wagmi configuration for wallet connection
export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})
