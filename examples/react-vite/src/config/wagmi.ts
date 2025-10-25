import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
// import { walletConnect } from 'wagmi/connectors' // Uncomment when adding WalletConnect Project ID

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    // WalletConnect removed temporarily - add your Project ID from https://cloud.walletconnect.com/ if needed
    // walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})
