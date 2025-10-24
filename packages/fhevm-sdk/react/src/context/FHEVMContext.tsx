import { createContext } from 'react'
import type { FHEVMClient, FHEVMInstance } from '@universal-fhevm/core'

export interface FHEVMContextValue {
  client: FHEVMClient | null
  instance: FHEVMInstance | null
  isReady: boolean
  error: Error | null
}

export const FHEVMContext = createContext<FHEVMContextValue>({
  client: null,
  instance: null,
  isReady: false,
  error: null,
})
