import { type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FHEVMProvider } from '@universal-fhevm/react'
import { wagmiConfig } from '../config/wagmi'
import { fhevmConfig } from '../config/fhevm'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <FHEVMProvider config={fhevmConfig}>
          {children}
        </FHEVMProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
