import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'
import { injected, walletConnect } from 'wagmi/connectors'

// Define Zama devnet chain
export const zama = defineChain({
  id: 8009,
  name: 'Zama Devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ZAMA',
    symbol: 'ZAMA',
  },
  rpcUrls: {
    default: { http: ['https://devnet.zama.ai/'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zama.ai' },
  },
})

export const wagmiConfig = createConfig({
  chains: [zama],
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }), // Replace with your WalletConnect project ID
  ],
  transports: {
    [zama.id]: http('https://devnet.zama.ai/'),
  },
})
