'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/config/wagmi'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Dynamically import FHEVMProvider to avoid SSR issues
const DynamicFHEVMProvider = dynamic(
  () => import('./FHEVMProviderWrapper').then((mod) => mod.FHEVMProviderWrapper),
  {
    ssr: false,
    loading: () => <div>Loading FHEVM...</div>,
  }
)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DynamicFHEVMProvider>
          {children}
        </DynamicFHEVMProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
