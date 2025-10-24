'use client'

import { ReactNode } from 'react'
import { FHEVMProvider, createConfig } from '@universal-fhevm/react'
import { fhevmConfig } from '@/config/fhevm'

export function FHEVMProviderWrapper({ children }: { children: ReactNode }) {
  // Create config on the client side only
  const config = createConfig(fhevmConfig)

  return <FHEVMProvider config={config}>{children}</FHEVMProvider>
}
