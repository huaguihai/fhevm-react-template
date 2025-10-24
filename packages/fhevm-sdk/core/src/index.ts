// Client
export { FHEVMClient, type FHEVMInstance, type EncryptedInputBuilder, type EIP712 } from './client/FHEVMClient'
export { createConfig } from './client/createConfig'

// Encryption
export { encrypt, encryptBatch, createEncryptedInput } from './encryption'

// Decryption
export { decrypt, reencrypt, generateToken } from './decryption'

// Types
export type {
  FHEVMConfig,
  EncryptType,
  EncryptParams,
  EncryptBatchParams,
  EncryptedData,
  DecryptParams,
  TokenParams,
  Signer,
} from './types'

// Errors
export {
  FHEVMError,
  InstanceNotReadyError,
  EncryptionError,
  DecryptionError,
  ConfigError,
} from './utils/errors'
