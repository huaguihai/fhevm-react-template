// Plugin
export { FHEVMPlugin, type FHEVMPluginOptions, type FHEVMPluginState } from './plugin/FHEVMPlugin'

// Composables
export { useFHEVM } from './composables/useFHEVM'
export { useEncrypt, type UseEncryptOptions } from './composables/useEncrypt'
export { useDecrypt, type UseDecryptOptions, type DecryptParamsWithAuth } from './composables/useDecrypt'

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
