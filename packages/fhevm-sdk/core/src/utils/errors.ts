/**
 * Base error class for FHEVM SDK
 */
export class FHEVMError extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.name = 'FHEVMError'
    Object.setPrototypeOf(this, FHEVMError.prototype)
  }
}

/**
 * Thrown when FHEVM instance is not ready
 */
export class InstanceNotReadyError extends FHEVMError {
  constructor() {
    super('FHEVM instance is not initialized. Call init() first.', 'INSTANCE_NOT_READY')
    this.name = 'InstanceNotReadyError'
  }
}

/**
 * Thrown when encryption fails
 */
export class EncryptionError extends FHEVMError {
  constructor(message: string) {
    super(`Encryption failed: ${message}`, 'ENCRYPTION_ERROR')
    this.name = 'EncryptionError'
  }
}

/**
 * Thrown when decryption fails
 */
export class DecryptionError extends FHEVMError {
  constructor(message: string) {
    super(`Decryption failed: ${message}`, 'DECRYPTION_ERROR')
    this.name = 'DecryptionError'
  }
}

/**
 * Thrown when configuration is invalid
 */
export class ConfigError extends FHEVMError {
  constructor(message: string) {
    super(`Invalid configuration: ${message}`, 'CONFIG_ERROR')
    this.name = 'ConfigError'
  }
}
