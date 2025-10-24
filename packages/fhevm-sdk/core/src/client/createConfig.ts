import type { FHEVMConfig } from '../types'
import { ConfigError } from '../utils/errors'

/**
 * Create and validate FHEVM configuration
 */
export function createConfig(config: FHEVMConfig): FHEVMConfig {
  // Validate required fields
  if (!config.chainId) {
    throw new ConfigError('chainId is required')
  }

  if (!config.networkUrl) {
    throw new ConfigError('networkUrl is required')
  }

  if (!config.gatewayUrl) {
    throw new ConfigError('gatewayUrl is required')
  }

  if (!config.aclAddress) {
    throw new ConfigError('aclAddress is required')
  }

  // Validate chain ID
  if (typeof config.chainId !== 'number' || config.chainId <= 0) {
    throw new ConfigError('chainId must be a positive number')
  }

  // Validate URLs
  try {
    new URL(config.networkUrl)
  } catch {
    throw new ConfigError('networkUrl must be a valid URL')
  }

  try {
    new URL(config.gatewayUrl)
  } catch {
    throw new ConfigError('gatewayUrl must be a valid URL')
  }

  // Validate ACL address (basic Ethereum address validation)
  if (!/^0x[a-fA-F0-9]{40}$/.test(config.aclAddress)) {
    throw new ConfigError('aclAddress must be a valid Ethereum address')
  }

  // Return config with defaults
  return {
    ...config,
    cacheEnabled: config.cacheEnabled ?? true,
    autoInit: config.autoInit ?? true,
  }
}
