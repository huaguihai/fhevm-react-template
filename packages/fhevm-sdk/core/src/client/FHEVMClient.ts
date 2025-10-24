import type { FHEVMConfig } from '../types'
import { InstanceNotReadyError } from '../utils/errors'

// Type for FHEVM instance from fhevmjs
export interface FHEVMInstance {
  createEncryptedInput(contractAddress: string, userAddress: string): EncryptedInputBuilder
  getPublicKey(): string | null
  reencrypt(
    handle: bigint,
    privateKey: string,
    publicKey: string,
    signature: string,
    contractAddress: string,
    userAddress: string
  ): Promise<bigint>
  createEIP712(publicKey: string, contractAddress: string, userAddress?: string): EIP712
  generateKeypair(): { publicKey: string; privateKey: string }
}

export interface EncryptedInputBuilder {
  add8(value: number): EncryptedInputBuilder
  add16(value: number): EncryptedInputBuilder
  add32(value: number): EncryptedInputBuilder
  add64(value: bigint): EncryptedInputBuilder
  add128(value: bigint): EncryptedInputBuilder
  add256(value: bigint): EncryptedInputBuilder
  addBool(value: boolean): EncryptedInputBuilder
  encrypt(): { handles: Uint8Array[]; inputProof: Uint8Array }
  getValues(): Uint8Array[]
}

export interface EIP712 {
  domain: {
    name: string
    version: string
    chainId: number
    verifyingContract: string
  }
  types: Record<string, any>
  message: Record<string, any>
  primaryType: string
}

/**
 * FHEVM Client for managing instance lifecycle
 */
export class FHEVMClient {
  private instance: FHEVMInstance | null = null
  private config: FHEVMConfig
  private isInitialized: boolean = false
  private static instanceCache = new Map<string, FHEVMInstance>()

  constructor(config: FHEVMConfig) {
    this.config = config
  }

  /**
   * Initialize the FHEVM instance
   */
  async init(): Promise<void> {
    if (this.isInitialized && this.instance) {
      return
    }

    const cacheKey = this.getCacheKey()

    // Check cache if enabled
    if (this.config.cacheEnabled && FHEVMClient.instanceCache.has(cacheKey)) {
      this.instance = FHEVMClient.instanceCache.get(cacheKey)!
      this.isInitialized = true
      return
    }

    // Create new instance
    try {
      // Dynamic import to support both Node.js and browser
      const { createInstance, initFhevm } = await import('fhevmjs')

      // In browser, we need to init WASM first
      if (typeof window !== 'undefined') {
        await initFhevm()
      }

      const instance = await createInstance({
        chainId: this.config.chainId,
        networkUrl: this.config.networkUrl,
        gatewayUrl: this.config.gatewayUrl,
        aclAddress: this.config.aclAddress,
      })

      this.instance = instance as unknown as FHEVMInstance
      this.isInitialized = true

      // Cache instance if enabled
      if (this.config.cacheEnabled) {
        FHEVMClient.instanceCache.set(cacheKey, this.instance)
      }
    } catch (error) {
      throw new Error(
        `Failed to initialize FHEVM instance: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  /**
   * Get the FHEVM instance
   */
  getInstance(): FHEVMInstance {
    if (!this.instance || !this.isInitialized) {
      throw new InstanceNotReadyError()
    }
    return this.instance
  }

  /**
   * Check if instance is ready
   */
  isReady(): boolean {
    return this.isInitialized && this.instance !== null
  }

  /**
   * Get config
   */
  getConfig(): FHEVMConfig {
    return this.config
  }

  /**
   * Generate cache key for instance caching
   */
  private getCacheKey(): string {
    return `${this.config.chainId}-${this.config.networkUrl}-${this.config.gatewayUrl}`
  }

  /**
   * Clear the instance cache
   */
  static clearCache(): void {
    FHEVMClient.instanceCache.clear()
  }
}
