/**
 * Supported encryption types for FHEVM
 */
export type EncryptType = 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256'

/**
 * FHEVM configuration
 */
export interface FHEVMConfig {
  /** Chain ID */
  chainId: number
  /** Network RPC URL */
  networkUrl: string
  /** Gateway URL for KMS */
  gatewayUrl: string
  /** ACL contract address */
  aclAddress: string
  /** Enable instance caching (default: true) */
  cacheEnabled?: boolean
  /** Auto-initialize on creation (default: true) */
  autoInit?: boolean
}

/**
 * Encryption parameters
 */
export interface EncryptParams {
  /** Value to encrypt */
  value: number | bigint | boolean
  /** Type of encryption */
  type: EncryptType
  /** Target contract address */
  contractAddress: string
}

/**
 * Batch encryption parameters
 */
export interface EncryptBatchParams {
  /** Array of values to encrypt */
  values: Array<{
    value: number | bigint | boolean
    type: EncryptType
  }>
  /** Target contract address */
  contractAddress: string
}

/**
 * Encrypted data result
 */
export interface EncryptedData {
  /** Encrypted handles */
  handles: string[]
  /** Input proof */
  inputProof: Uint8Array
}

/**
 * Decryption parameters
 */
export interface DecryptParams {
  /** Encrypted handle */
  handle: string
  /** Contract address */
  contractAddress: string
}

/**
 * Token generation parameters
 */
export interface TokenParams {
  /** Verifying contract address */
  verifyingContract: string
}

/**
 * Signer interface (compatible with ethers/viem)
 */
export interface Signer {
  getAddress(): Promise<string>
  signTypedData(...args: any[]): Promise<string>
}
