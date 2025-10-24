// Context and Provider
export { FHEVMProvider, type FHEVMProviderProps } from './context/FHEVMProvider'
export { FHEVMContext, type FHEVMContextValue } from './context/FHEVMContext'

// Hooks
export { useFHEVM } from './hooks/useFHEVM'
export { useEncrypt, type UseEncryptOptions } from './hooks/useEncrypt'
export { useDecrypt, type UseDecryptOptions } from './hooks/useDecrypt'
export { useEncryptBatch, type UseEncryptBatchOptions } from './hooks/useEncryptBatch'

// Re-export core types and utilities
export { createConfig } from '@universal-fhevm/core'
export type {
  FHEVMConfig,
  EncryptType,
  EncryptParams,
  EncryptBatchParams,
  EncryptedData,
  DecryptParams,
  TokenParams,
} from '@universal-fhevm/core'
