import type { DecryptParams, TokenParams } from '../types'
import type { FHEVMInstance, EIP712 } from '../client/FHEVMClient'
import { DecryptionError } from '../utils/errors'

/**
 * Generate EIP712 for token signing
 */
export async function generateToken(
  instance: FHEVMInstance,
  params: TokenParams & { userAddress?: string }
): Promise<EIP712> {
  try {
    const publicKey = instance.getPublicKey()
    if (!publicKey) {
      throw new DecryptionError('Public key not available')
    }

    const eip712 = instance.createEIP712(
      publicKey,
      params.verifyingContract,
      params.userAddress
    )
    return eip712
  } catch (error) {
    throw new DecryptionError(
      `Failed to generate token: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Decrypt a value (requires reencryption flow)
 */
export async function decrypt(
  instance: FHEVMInstance,
  params: DecryptParams,
  userAddress: string,
  privateKey: string,
  signature: string
): Promise<bigint> {
  try {
    // Get public key
    const publicKey = instance.getPublicKey()
    if (!publicKey) {
      throw new DecryptionError('Public key not available')
    }

    // Reencrypt the handle
    const decrypted = await instance.reencrypt(
      BigInt(params.handle),
      privateKey,
      publicKey,
      signature,
      params.contractAddress,
      userAddress
    )

    return decrypted
  } catch (error) {
    throw new DecryptionError(
      `Failed to decrypt: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Reencrypt a handle for viewing
 */
export async function reencrypt(
  instance: FHEVMInstance,
  handle: string,
  contractAddress: string,
  userAddress: string,
  privateKey: string,
  signature: string
): Promise<bigint> {
  try {
    const publicKey = instance.getPublicKey()
    if (!publicKey) {
      throw new DecryptionError('Public key not available')
    }

    const result = await instance.reencrypt(
      BigInt(handle),
      privateKey,
      publicKey,
      signature,
      contractAddress,
      userAddress
    )

    return result
  } catch (error) {
    throw new DecryptionError(
      `Failed to reencrypt: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
