import {
  FHEVMClient as CoreClient,
  createConfig,
  encrypt as coreEncrypt,
  encryptBatch as coreEncryptBatch,
  decrypt as coreDecrypt,
  reencrypt as coreReencrypt,
  generateToken as coreGenerateToken,
  type FHEVMConfig,
  type EncryptParams,
  type EncryptBatchParams,
  type EncryptedData,
  type DecryptParams,
  type TokenParams,
} from '@universal-fhevm/core'

/**
 * Extended FHEVM Client for vanilla JS/Node.js with simplified API
 */
export class FHEVMClient extends CoreClient {
  private userAddress: string = ''
  private privateKey: string = ''

  /**
   * Set user address for operations
   */
  setUserAddress(address: string): void {
    this.userAddress = address
  }

  /**
   * Get user address
   */
  getUserAddress(): string {
    return this.userAddress
  }

  /**
   * Set private key for decryption
   */
  setPrivateKey(key: string): void {
    this.privateKey = key
  }

  /**
   * Encrypt a single value
   */
  async encrypt(params: EncryptParams): Promise<EncryptedData> {
    const instance = this.getInstance()
    return coreEncrypt(instance, params, this.userAddress)
  }

  /**
   * Encrypt multiple values in batch
   */
  async encryptBatch(params: EncryptBatchParams): Promise<EncryptedData> {
    const instance = this.getInstance()
    return coreEncryptBatch(instance, params, this.userAddress)
  }

  /**
   * Decrypt a value
   */
  async decrypt(params: DecryptParams, signature: string): Promise<bigint> {
    const instance = this.getInstance()
    return coreDecrypt(instance, params, this.userAddress, this.privateKey, signature)
  }

  /**
   * Reencrypt a handle
   */
  async reencrypt(handle: string, contractAddress: string, signature: string): Promise<bigint> {
    const instance = this.getInstance()
    return coreReencrypt(
      instance,
      handle,
      contractAddress,
      this.userAddress,
      this.privateKey,
      signature
    )
  }

  /**
   * Generate EIP712 for token signing
   */
  async generateToken(params: TokenParams & { userAddress?: string }): Promise<any> {
    const instance = this.getInstance()
    return coreGenerateToken(instance, { ...params, userAddress: params.userAddress || this.userAddress })
  }
}

// Re-export types and utilities
export { createConfig }
export type {
  FHEVMConfig,
  EncryptParams,
  EncryptBatchParams,
  EncryptedData,
  DecryptParams,
  TokenParams,
}
