import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'
import { injected } from 'wagmi/connectors'
// import { walletConnect } from 'wagmi/connectors' // Uncomment when adding WalletConnect Project ID

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
    // WalletConnect removed temporarily - add your Project ID from https://cloud.walletconnect.com/ if needed
    // walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    [zama.id]: http('https://devnet.zama.ai/'),
  },
})
